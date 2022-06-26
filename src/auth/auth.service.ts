import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import IUser from 'src/user/user.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  getToken(userId: string, email: string) {
    const accessToken = this.jwtService.sign(
      {
        email,
        userId,
      },
      { expiresIn: 60 * 60 * 24 * 7, secret: process.env.APP_SECRET },
    );
    return accessToken;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.findUserByEmail(loginUserDto.email);
    if (!user) {
      throw new HttpException(
        'Invalid Credentials, email or password is wrong.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  async verifyPayload(payload: JwtPayload): Promise<IUser> {
    const user: IUser = await this.userService.findUserByEmail(payload.email);

    if (!user)
      throw new HttpException('Invalid Credentials', HttpStatus.FORBIDDEN);

    delete user.password;

    return user;
  }
}
