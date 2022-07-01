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
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import IComments from './comments.interface';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private userService: UserService, // private blogsService: BlogsService,
  ) {}

  @Post()
  @ApiBody({ type: CreateCommentDto })
  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({ status: 401, description: 'BadRequest.' })
  async create(@Body() createCommentDto: CreateCommentDto): Promise<IComments> {
    if (!(await this.userService.isUserExist(createCommentDto.userId)))
      throw new HttpException(
        'This user is not exist, please provide another userId.',
        HttpStatus.BAD_REQUEST,
      );
    // if (!(await this.blogsService.isBlogExist(createCommentDto.blogId)))
    //   throw new HttpException(
    //     'This blog is not exist, please provide another blogId.',
    //     HttpStatus.BAD_REQUEST,
    //   );
    return this.commentsService.create(createCommentDto);
  }

  // @Get(':id')
  // async getUser(@Param('id') id: string): Promise<any> {
  //   return await this.commentsService.getUserInfo(id);
  // }
  @Get(':id')
  async getAllCommentsByBlogId(@Param('id') id: string): Promise<any> {
    return await this.commentsService.getBlogComments(id);
  }

  @Get()
  async findAll(): Promise<any> {
    const comments = await this.commentsService.getAllComments();
    const count = await this.commentsService.count();
    return { comments, count };
  }

  @Patch(':id')
  @ApiBody({ type: UpdateCommentDto })
  @ApiOperation({ summary: 'Update Comment' })
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<IComments> {
    return await this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Comment' })
  async remove(@Param('id') id: string): Promise<IComments> {
    return this.commentsService.remove(id);
  }
}
