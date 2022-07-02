import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogsEntity, IBlogsModel } from './entities/blog.entity';
import { QueryService, InjectQueryService } from '@nestjs-query/core';
import { CreateBlogsDto } from './dto/create-blog.dto';
import { UpdateBlogsDto } from './dto/update-blog.dto';
import { CommentsService } from 'src/comments/comments.service';
import { UtilsService } from 'src/common/utils/utils.service';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel('Blogs') private blogsModel: IBlogsModel,
    @InjectQueryService(BlogsEntity)
    readonly blogsService: QueryService<BlogsEntity>,
    private commentService: CommentsService,
    private utileService: UtilsService,
  ) {}

  async create(createBlogsDto: CreateBlogsDto) {
    const blog = {
      userId: createBlogsDto.userId,
      title: createBlogsDto.title,
      subtitle: createBlogsDto.subtitle,
      photo: createBlogsDto.photo,
      body: createBlogsDto.body,
      tags: createBlogsDto.tags,
      date: createBlogsDto.date,
      approved: false,
    };

    const newBlog = await this.blogsModel.create(blog);
    console.log({ newBlog });
    return newBlog.save();
  }

  async count() {
    const count = await this.blogsModel.count();
    return count;
  }

  async getAllBlogs(filter) {
    filter = this.utileService.parseQuery(filter);
    console.log({ filter });
    filter.filter = {
      ...filter.filter,
      approved: { eq: true },
      rejected: { eq: false },
    };
    console.log(filter);
    return Object.keys(filter).length !== 0
      ? await this.blogsService.query(filter)
      : await this.blogsModel
          .find({ approved: true, rejected: false })
          .populate('userId', 'name email avatar gender -_id');
  }

  async getBlogWithComments(id: string) {
    const blog = await this.blogsModel
      .findOne({ id, approved: true, rejected: false })
      .populate('userId');
    const comments = await this.commentService.findCommentsByBlogId(id);
    return { ...blog.toJSON(), comments };
  }

  async update(id: string, updateBlogsDto: UpdateBlogsDto) {
    let blogExist = await this.blogsModel.findOne({
      _id: id,
      approved: !updateBlogsDto.approved,
    });
    // console.log({ blogExist });

    if (!blogExist)
      throw new HttpException(
        'This blog  is not exist, please provide valid blog .',
        HttpStatus.BAD_REQUEST,
      );

    // this update function is gonna be a common update
    blogExist = this.utileService.getUpdatedDoc(blogExist, updateBlogsDto);

    // console.log({ blogExist });
    const updatedBlog = this.blogsModel
      .findByIdAndUpdate(id, blogExist, {
        new: true,
      })
      .exec();
    return updatedBlog;
  }

  async remove(id: string) {
    const result = await this.blogsModel.findByIdAndRemove(id).exec();
    return result;
  }

  async findBlogById(id: string) {
    return await this.blogsModel.findById(id).exec();
  }

  async isBlogExist(id?: string) {
    if (id) return await this.findBlogById(id);

    return false;
  }
}
