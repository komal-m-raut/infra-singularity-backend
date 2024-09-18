import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("./interfaces/user.interface").User>;
    findAll(): Promise<import("./interfaces/user.interface").User[]>;
    findById(id: string): Promise<import("./interfaces/user.interface").User>;
}
