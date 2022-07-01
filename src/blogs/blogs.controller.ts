import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import RoleGuard from 'src/auth/guards/role.guard';
import { Role } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import IBlogs from './blogs.interface';
import { BlogsService } from './blogs.service';
import { CreateBlogsDto } from './dto/create-blog.dto';
import { UpdateBlogsDto } from './dto/update-blog.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
    private userService: UserService,
  ) {}

  @Post()
  @UseGuards(JWTAuthGuard)
  @ApiBody({ type: CreateBlogsDto })
  @ApiOperation({ summary: 'Create Blog' })
  @ApiResponse({ status: 401, description: 'BadRequest.' })
  async create(@Body() createBlogsDto: CreateBlogsDto): Promise<IBlogs> {
    if (!(await this.userService.isUserExist(createBlogsDto.userId)))
      throw new HttpException(
        'This user is not exist, please provide another userId.',
        HttpStatus.BAD_REQUEST,
      );
    return this.blogsService.create(createBlogsDto);
  }

  @Get('/count')
  @UseGuards(RoleGuard(Role.Admin))
  async count(): Promise<number> {
    return await this.blogsService.count();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<any> {
    return await this.blogsService.getUserInfo(id);
  }

  @Get()
  async findAll(): Promise<any> {
    const blogs = await this.blogsService.getAllBlogs();
    const count = await this.blogsService.count();
    return { blogs, count };
  }

  @Patch(':id')
  @UseGuards(RoleGuard(Role.Admin))
  @ApiBody({ type: UpdateBlogsDto })
  @ApiOperation({ summary: 'Update Blog' })
  async update(
    @Param('id') id: string,
    @Body() updateBlogsDto: UpdateBlogsDto,
  ): Promise<IBlogs> {
    return await this.blogsService.update(id, updateBlogsDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard(Role.Admin))
  @ApiOperation({ summary: 'Delete Blog' })
  async remove(@Param('id') id: string): Promise<IBlogs> {
    return this.blogsService.remove(id);
  }
}
