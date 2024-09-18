import { forwardRef, Module } from "@nestjs/common";
import { CouponService } from "./coupon.service";
import { CouponController } from "./coupon.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { CouponSchema } from "./schema/coupon.schema";
import { OrganizationModule } from "src/organization/organization.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Coupon", schema: CouponSchema }]),
    forwardRef(() => OrganizationModule),
  ],
  providers: [CouponService],
  controllers: [CouponController],
  exports: [MongooseModule, CouponService],
})
export class CouponModule {}
