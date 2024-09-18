import { IsString } from "class-validator";

export class UpdateCouponDto {
  @IsString()
  name: string;

  @IsString()
  discount: string;
}
