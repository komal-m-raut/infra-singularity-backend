import { UserService } from './user.service';
import { User } from './user.interface';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: User): Promise<void>;
    findAll(): Promise<User[]>;
}
