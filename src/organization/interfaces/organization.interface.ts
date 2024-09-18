import { Document } from "mongoose";

export interface Organization extends Document {
  name: string;
  users: string[];
  ownerId: string;
  coupons: string[];
}
