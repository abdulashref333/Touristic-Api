import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogsEntity, IBlogsModel } from './entities/blog.entity';
import { QueryService, InjectQueryService } from '@nestjs-query/core';
import { CreateBlogsDto } from './dto/create-blog.dto';
import { UpdateBlogsDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel('Blogs') private blogsModel: IBlogsModel,
    @InjectQueryService(BlogsEntity)
    readonly blogsService: QueryService<BlogsEntity>,
  ) {}

  async create(CreateBlogsDto: CreateBlogsDto) {
    const blogExist = await this.blogsModel.findOne({
      userId: CreateBlogsDto.userId,
      title: CreateBlogsDto.title,
    });
    const blog = {
      userId: CreateBlogsDto.userId,
      title: CreateBlogsDto.title,
      subtitle: CreateBlogsDto.subtitle,
      photo: CreateBlogsDto.photo,
      body: CreateBlogsDto.body,
      tags: CreateBlogsDto.tags,
      date: CreateBlogsDto.date,
      approved: false,
    };

    const newBlog = await this.blogsModel.create(blog);
    return newBlog.save();
  }

  async count() {
    const count = await this.blogsModel.count();
    return await count;
  }

  async getAllBlogs() {
    return await this.blogsModel.find({ approved: true }).exec();
  }

  async update(id: string, updateBlogsDto: UpdateBlogsDto) {
    const blogExist = await this.blogsModel.findById(id).exec();
    if (!blogExist)
      throw new HttpException(
        'This blog  is not exist, please provide valid blog .',
        HttpStatus.BAD_REQUEST,
      );

    // this update function is gonna be a common update
    Object.keys(updateBlogsDto).forEach((key) => {
      blogExist[key] = updateBlogsDto[key];
    });

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
}
