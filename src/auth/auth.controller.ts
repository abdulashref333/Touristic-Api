import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import IUser from 'src/user/user.interface';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenInterceptor } from './interceptors/token.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseInterceptors(TokenInterceptor)
  async signup(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return await this.authService.signUp(createUserDto);
  }

  @Post('login')
  @ApiBody({ type: LoginUserDto })
  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseInterceptors(TokenInterceptor)
  async login(@Body() loginUserDto: LoginUserDto): Promise<IUser> {
    return await this.authService.login(loginUserDto);
  }
}
