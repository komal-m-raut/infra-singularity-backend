import { Document } from 'mongoose';
export interface Organization extends Document {
    id?: string;
    name: string;
    adminId: string;
    userIds: string[];
}
