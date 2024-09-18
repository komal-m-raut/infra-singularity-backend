import { Module } from "@nestjs/common";
import { CouponService } from "./coupon.service";
import { CouponController } from "./coupon.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { CouponSchema } from "./schema/coupon.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Coupon", schema: CouponSchema }]),
  ],
  providers: [CouponService],
  controllers: [CouponController],
  exports: [MongooseModule],
})
export class CouponModule {}
