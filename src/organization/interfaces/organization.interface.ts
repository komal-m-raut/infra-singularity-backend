import { Document } from 'mongoose';

export interface Organization extends Document {
  id?: string;
  name: string;
  adminId: string; // Store user ID as adminId
  userIds: string[]; // Array of user IDs
}