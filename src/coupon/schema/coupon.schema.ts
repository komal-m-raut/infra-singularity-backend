import { Schema } from "mongoose";

export const CouponSchema = new Schema({
  name: { type: String, required: true },
  discount: { type: String, required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: "User" },
});
