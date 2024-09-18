import { forwardRef, Module } from "@nestjs/common";
import { OrganizationService } from "./organization.service";
import { OrganizationController } from "./organization.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { OrganizationSchema } from "./schemas/organization.schema";
import { UserModule } from "src/user/user.module";
import { CouponModule } from "src/coupon/coupon.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Organization", schema: OrganizationSchema },
    ]),
    forwardRef(() => CouponModule),
    UserModule,
  ],
  providers: [OrganizationService],
  controllers: [OrganizationController],
  exports: [MongooseModule, OrganizationService],
})
export class OrganizationModule {}
