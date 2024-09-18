import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from "@nestjs/common";
import { CouponService } from "./coupon.service";
import { JwtAuthGuard } from "src/auth/auth.guard";
import { UpdateCouponDto } from "./dto/coupon.dto";

@Controller("coupon")
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @UseGuards(JwtAuthGuard)
  @Patch("/:couponId")
  async updateCoupon(
    @Request() req,
    @Param("couponId") couponId: string,
    @Body() updateCouponDto: UpdateCouponDto
  ) {
    const userId = req.user.userId;
    return this.couponService.updateCoupon(updateCouponDto, userId, couponId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCoupons(@Request() req) {
    const userId = req.user.userId;
    return this.couponService.getCoupons(userId);
  }
}
