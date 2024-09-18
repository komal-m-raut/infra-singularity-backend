import { Schema } from 'mongoose';

export const OrganizationSchema = new Schema({
  name: { type: String, required: true },
  adminId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});