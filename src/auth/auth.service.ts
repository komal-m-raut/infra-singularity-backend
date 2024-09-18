import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { email, password } = signupDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.create({ email, password: hashedPassword });
    return this.generateToken(user);
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return this.generateToken(user);
  }

  private generateToken(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}