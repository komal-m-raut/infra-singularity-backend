import { Document } from "mongoose";

export interface Coupon extends Document {
  name: string;
  discount: string;
  ownerId: string;
}
