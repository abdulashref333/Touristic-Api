import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import IUser from 'src/user/user.interface';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { Request } from 'express';
import * as multer from 'multer';
import * as fs from 'fs';

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    if (file) {
      const name =
        file.originalname.split('.')[0] + '_' + Date.now().toString();
      console.log(file);

      const path = `./images/avatars/${name}`;
      if (!fs.existsSync(path)) fs.mkdirSync(path);
      cb(null, path);
    }
    cb(null, '');
  },
});
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseInterceptors(FileInterceptor('avatar', { storage }))
  @UseInterceptors(TokenInterceptor)
  async signup(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file,
    @Req() req: Request,
  ): Promise<IUser> {
    console.log(file);
    const avatar = file ? file.path : req.body.avatar;
    // return;
    return await this.authService.signUp({ ...createUserDto, avatar });
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
