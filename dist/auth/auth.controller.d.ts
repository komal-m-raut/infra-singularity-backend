import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(signupDto: SignupDto): Promise<{
        access_token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    logout(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
