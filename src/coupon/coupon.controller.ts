import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
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
  @Patch("/:id")
  async updateCoupon(@Request() req, @Body() updateCouponDto: UpdateCouponDto) {
    const userId = req.user.userId;
    return this.couponService.updateCoupon(updateCouponDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCoupons(@Request() req) {
    const userId = req.user.userId;
    return this.couponService.getCoupons(userId);
  }
}
