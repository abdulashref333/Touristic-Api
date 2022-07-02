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
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import * as multer from 'multer';
import * as fs from 'fs';

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
    // if (!(await this.userService.isUserExist(createBlogsDto.userId)))
    //   throw new HttpException(
    //     'This user is not exist, please provide another userId.',
    //     HttpStatus.BAD_REQUEST,
    //   );
    console.log({ createBlogsDto });
    return this.blogsService.create(createBlogsDto);
  }

  @Post('photo/:id')
  @UseInterceptors(FileInterceptor('photo', { storage }))
  @UseGuards(JWTAuthGuard)
  async uploadCover(@Param('id') id: string, @UploadedFile() file) {
    if (!file)
      throw new HttpException(
        'Avatar Must be Provided.',
        HttpStatus.BAD_REQUEST,
      );
    const photo = file.path;
    return await this.update(id, { photo });
  }

  @Get('/count')
  @UseGuards(RoleGuard(Role.Admin))
  async count(): Promise<number> {
    return await this.blogsService.count();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<any> {
    return await this.blogsService.getBlogWithComments(id);
  }

  @Get()
  async findAll(@Query() query): Promise<any> {
    const blogs = await this.blogsService.getAllBlogs(query);
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
