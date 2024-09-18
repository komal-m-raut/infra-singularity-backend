import { Schema } from 'mongoose';
export declare const OrganizationSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    adminId: import("mongoose").Types.ObjectId;
    userIds: import("mongoose").Types.ObjectId[];
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    adminId: import("mongoose").Types.ObjectId;
    userIds: import("mongoose").Types.ObjectId[];
}>> & import("mongoose").FlatRecord<{
    name: string;
    adminId: import("mongoose").Types.ObjectId;
    userIds: import("mongoose").Types.ObjectId[];
}> & {
    _id: import("mongoose").Types.ObjectId;
}>;
