import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import IUser, { UserQuery } from './user.interface';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import RoleGuard from 'src/auth/guards/role.guard';
import { Role } from './entities/user.entity';
import * as multer from 'multer';
import * as fs from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import SameUser from 'src/auth/guards/sameuser.guard';

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    const name = file.originalname.split('.')[0] + '_' + Date.now().toString();
    const path = `./images/avatars/${name}`;
    // console.log({ path });
    if (!fs.existsSync(path)) fs.mkdirSync(path);
    cb(null, path);
  },
});
@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file,
    @Req() req: Request,
  ): Promise<IUser> {
    const avatar = file ? file.path : req.body.avatar;
    return this.userService.create({ ...createUserDto, avatar });
  }

  @Post('avatar/:id')
  @UseInterceptors(FileInterceptor('avatar', { storage }))
  @UseGuards(JWTAuthGuard)
  async uploadAvatar(@Param('id') id: string, @UploadedFile() file) {
    if (!file)
      throw new HttpException(
        'Avatar Must be Provided.',
        HttpStatus.BAD_REQUEST,
      );
    const avatar = file.path;
    return await this.update(id, { avatar });
  }

  @Get()
  @UseGuards(JWTAuthGuard)
  async findAll(@Query() query, @Req() req: Request): Promise<any> {
    console.log(req.headers);
    Object.keys(query).forEach((f) => (query[f] = JSON.parse(query[f])));
    // console.log({ query });
    const users = await this.userService.findAll(query);
    const count = await this.userService.count();
    return { users, count };
  }

  @Get('/count')
  @ApiOperation({ summary: 'Get Users Count' })
  async count(): Promise<number> {
    return await this.userService.count();
  }

  @Get('one')
  @ApiQuery({ name: 'email', type: 'string', required: false })
  @ApiQuery({ name: 'id', type: 'string', required: false })
  @ApiQuery({ name: 'job', type: 'string', required: false })
  @UseGuards(JWTAuthGuard)
  async findOne(@Query() query: UserQuery): Promise<IUser> {
    return this.userService.findOne(query);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  @ApiOperation({ summary: 'Update User' })
  // @UseGuards(JWTAuthGuard)
  @UseGuards(SameUser())
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    console.log({ updateUserDto });
    updateUserDto.role = Role.User;
    return await this.userService.updateForUser(id, updateUserDto);
  }

  @Patch('admin/:id')
  @ApiBody({ type: UpdateUserDto })
  @ApiOperation({ summary: 'Update User' })
  @UseGuards(RoleGuard(Role.Admin))
  async updateForAdmin(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    console.log({ updateUserDto });
    return await this.userService.updateForAdmin(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Update User' })
  @UseGuards(RoleGuard(Role.Admin))
  async remove(@Param('id') id: string): Promise<IUser> {
    return this.userService.remove(id);
  }
}
