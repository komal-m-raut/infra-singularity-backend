import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Coupon } from "./interfaces/coupon.interface";
import { UpdateCouponDto } from "./dto/coupon.dto";
import { Organization } from "src/organization/interfaces/organization.interface";
import { OrganizationService } from "src/organization/organization.service";

@Injectable()
export class CouponService {
  constructor(
    @InjectModel("Coupon")
    private readonly couponModel: Model<Coupon>,
    @InjectModel("Organization")
    private readonly organizationModel: Model<Organization>,
    @Inject(forwardRef(() => OrganizationService))
    private readonly organizationService: OrganizationService
  ) {}

  async updateCoupon(
    updateCouponDto: UpdateCouponDto,
    userId: string
  ): Promise<Coupon> {
    const coupon = await this.couponModel.findOne({
      _id: updateCouponDto.couponId,
    });
    if (!coupon) {
      throw new NotFoundException("Coupon not found");
    }
    if (coupon.ownerId !== userId) {
      throw new UnauthorizedException("You are not the owner of the coupon");
    }
    return this.couponModel.findByIdAndUpdate(
      updateCouponDto.couponId,
      updateCouponDto,
      { new: true }
    );
  }

  async getCoupons(userId: string): Promise<Coupon[]> {
    const usersOrganizations = await this.organizationModel.find(
      {
        users: userId,
      },
      { coupons: 1 }
    );

    const couponIds = usersOrganizations.reduce((acc, org) => {
      return acc.concat(org.coupons);
    }, []);

    const coupons = await this.couponModel.find({
      _id: { $in: couponIds },
    });

    return coupons;
  }
}
