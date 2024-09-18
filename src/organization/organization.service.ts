import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  forwardRef,
  Inject,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Organization } from "./interfaces/organization.interface";
import {
  CreateOrganizationDto,
  AddUserDto,
  RemoveUserDto,
  AddCouponDto,
  RemoveCouponDto,
} from "./dto/organization.dto";
import { User } from "../user/interfaces/user.interface";
import { Coupon } from "src/coupon/interfaces/coupon.interface";
import { CouponService } from "src/coupon/coupon.service";

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel("Organization")
    private readonly organizationModel: Model<Organization>,
    @InjectModel("Coupon") private readonly couponModel: Model<Coupon>,
    @InjectModel("User") private readonly userModel: Model<User>,
    @Inject(forwardRef(() => CouponService))
    private readonly couponService: CouponService
  ) {}

  async findById(organizationId: string): Promise<Organization> {
    return this.organizationModel.findById(organizationId).exec();
  }

  async createOrganization(
    createOrganizationDto: CreateOrganizationDto,
    userId: string
  ): Promise<Organization> {
    const userIds = await Promise.allSettled(
      createOrganizationDto.emails.map(async (email) => {
        const user = await this.userModel.findOne({ email });
        if (!user) {
          return;
        }
        return user._id;
      })
    );

    const createdOrganization = new this.organizationModel({
      name: createOrganizationDto.name,
      ownerId: userId,
      users: userIds
        .filter((user) => user.status === "fulfilled" && user.value)
        .map((user) => (user as PromiseFulfilledResult<any>).value),
    });
    return createdOrganization.save();
  }

  async addUser(addUserDto: AddUserDto, userId: string): Promise<Organization> {
    const user = await this.userModel.findOne({ email: addUserDto.email });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const organization = await this.organizationModel.findOne({
      ownerId: userId,
    });
    if (!organization) {
      throw new NotFoundException("Organization not found");
    }
    if (organization.users.includes(user._id as unknown as string)) {
      throw new BadRequestException("User already in organization");
    }
    const updateOrganization = await this.organizationModel
      .findOneAndUpdate(
        { ownerId: userId },
        { $push: { users: user._id } },
        { new: true }
      )
      .populate("users");
    return updateOrganization;
  }

  async removeUser(
    removeUserDto: RemoveUserDto,
    userId: string
  ): Promise<Organization> {
    const user = await this.userModel.findById(removeUserDto.userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const organization = await this.organizationModel.findOne({
      ownerId: userId,
    });
    if (!organization) {
      throw new NotFoundException("Organization not found");
    }
    if (!organization.users.includes(user._id as unknown as string)) {
      throw new BadRequestException("User not in organization");
    }
    const updateOrganization = await this.organizationModel
      .findOneAndUpdate(
        { ownerId: userId },
        { $pull: { users: user._id } },
        { new: true }
      )
      .populate("users coupons");
    return updateOrganization;
  }

  async addCoupon(addCouponDto: AddCouponDto, userId: string) {
    const organization = await this.organizationModel.findOne({
      ownerId: userId,
    });
    if (!organization) {
      throw new NotFoundException("Organization not found");
    }

    const coupon = await this.couponModel.create({
      name: addCouponDto.name,
      discount: addCouponDto.discount,
      ownerId: userId,
    });

    const updateOrganization = await this.organizationModel
      .findOneAndUpdate(
        { ownerId: userId },
        { $push: { coupons: coupon._id } },
        { new: true }
      )
      .populate("users coupons");
    return updateOrganization;
  }

  async removeCoupon(removeCouponDto: RemoveCouponDto, userId: string) {
    const coupon = await this.couponModel.findById(removeCouponDto.couponId);
    if (!coupon) {
      throw new NotFoundException("Coupon not found");
    }

    const organization = await this.organizationModel.findOne({
      ownerId: userId,
    });
    if (!organization) {
      throw new NotFoundException("Organization not found");
    }
    if (!organization.coupons.includes(coupon._id as unknown as string)) {
      throw new BadRequestException("Coupon not in organization");
    }
    const updateOrganization = await this.organizationModel
      .findOneAndUpdate(
        { ownerId: userId },
        { $pull: { coupons: coupon._id } },
        { new: true }
      )
      .populate("users coupons");
    await this.couponModel.findByIdAndDelete(coupon._id);
    return updateOrganization;
  }

  async getOrganization(userId: string): Promise<Organization> {
    try {
      return this.organizationModel
        .findOne({ ownerId: userId })
        .populate("users coupons")
        .exec();
    } catch {
      throw new NotFoundException("Organization not found");
    }
  }
}
