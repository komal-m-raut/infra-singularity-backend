import { Schema } from 'mongoose';

export const OrganizationSchema = new Schema({
  name: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  coupons: [{ type: Schema.Types.ObjectId, ref: 'Coupon' }],
});