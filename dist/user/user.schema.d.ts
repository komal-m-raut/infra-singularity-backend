import { Schema } from 'mongoose';
export declare const UserSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name?: string;
    email?: string;
    password?: string;
    walletAddress?: string;
    organizationId?: import("mongoose").Types.ObjectId;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    name?: string;
    email?: string;
    password?: string;
    walletAddress?: string;
    organizationId?: import("mongoose").Types.ObjectId;
}>> & import("mongoose").FlatRecord<{
    name?: string;
    email?: string;
    password?: string;
    walletAddress?: string;
    organizationId?: import("mongoose").Types.ObjectId;
}> & {
    _id: import("mongoose").Types.ObjectId;
}>;
