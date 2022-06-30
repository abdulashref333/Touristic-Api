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

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.userService.create(createUserDto);
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
  async findOne(@Query() query: UserQuery): Promise<IUser> {
    return this.userService.findOne(query);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  @ApiOperation({ summary: 'Update User' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Update User' })
  async remove(@Param('id') id: string): Promise<IUser> {
    return this.userService.remove(id);
  }
}
// app.get('users', usercontroller.getuser);
// app.get('users/:id')
// getuser(req, res, next) {
//   // here the logic of user controller.
// }

// class user {
//   findall() {
//     return 'users...';
//   }
// }
