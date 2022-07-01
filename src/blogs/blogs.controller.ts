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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiBody({ type: UpdateBlogsDto })
  @ApiOperation({ summary: 'Update Blog' })
  async update(
    @Param('id') id: string,
    @Body() updateBlogsDto: UpdateBlogsDto,
  ): Promise<IBlogs> {
    return await this.blogsService.update(id, updateBlogsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Blog' })
  async remove(@Param('id') id: string): Promise<IBlogs> {
    return this.blogsService.remove(id);
  }
}
