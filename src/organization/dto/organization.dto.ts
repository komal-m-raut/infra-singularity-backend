import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  emails: string[];
}

export class AddUserDto {
  @IsEmail()
  email: string;
}

export class RemoveUserDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class AddCouponDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  discount: string;
}

export class RemoveCouponDto {
  @IsString()
  @IsNotEmpty()
  couponId: string;
}
