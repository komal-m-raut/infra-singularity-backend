import { Model } from 'mongoose';
import { User } from './user.interface';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
}
