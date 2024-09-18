import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    signup(signupDto: SignupDto): Promise<{
        access_token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    private generateToken;
}
