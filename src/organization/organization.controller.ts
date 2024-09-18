import {
  Controller,
  UseGuards,
  Request,
  Post,
  Get,
  Body,
} from "@nestjs/common";
import { OrganizationService } from "./organization.service";
import {
  CreateOrganizationDto,
  AddUserDto,
  RemoveUserDto,
  AddCouponDto,
  RemoveCouponDto,
} from "./dto/organization.dto";
import { JwtAuthGuard } from "src/auth/auth.guard";

@Controller("organization")
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrganization(
    @Request() req,
    @Body() createOrganizationDto: CreateOrganizationDto
  ) {
    const userId = req.user.userId;
    return this.organizationService.createOrganization(
      createOrganizationDto,
      userId
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post("add-user")
  async addUser(@Request() req, @Body() addUserDto: AddUserDto) {
    const userId = req.user.userId;
    return this.organizationService.addUser(addUserDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post("remove-user")
  async removeUser(@Request() req, @Body() removeUserDto: RemoveUserDto) {
    const userId = req.user.userId;
    return this.organizationService.removeUser(removeUserDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post("add-coupon")
  async addCoupon(@Request() req, @Body() addCouponDto: AddCouponDto) {
    const userId = req.user.userId;
    return this.organizationService.addCoupon(addCouponDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post("remove-coupon")
  async removeCoupon(@Request() req, @Body() removeCouponDto: RemoveCouponDto) {
    const userId = req.user.userId;
    return this.organizationService.removeCoupon(removeCouponDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getOrganization(@Request() req) {
    const userId = req.user.userId;
    return this.organizationService.getOrganization(userId);
  }
}
