import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
}
