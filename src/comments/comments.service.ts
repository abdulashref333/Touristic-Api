import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsEntity, ICommentsModel } from './entities/comment.entity';
import { QueryService, InjectQueryService } from '@nestjs-query/core';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('Comments') private commentsModel: ICommentsModel,
    @InjectQueryService(CommentsEntity)
    readonly CommentsService: QueryService<CommentsEntity>,
  ) {}

  async create(CreateCommentsDto: CreateCommentDto) {
    const comment = {
      userId: CreateCommentsDto.userId,
      blogId: CreateCommentsDto.blogId,
      body: CreateCommentsDto.body,
    };

    const newComment = await this.commentsModel.create(comment);
    return newComment.save();
  }

  async getUserInfo(id: string) {
    return await this.commentsModel
      .findOne({ userId: id })
      .select('userId')
      .populate('userId');
  }

  async getBlogComments(id: string) {
    return await this.commentsModel
      .find({ blogId: id })
      .select('body userId')
      .populate('userId', 'name email gender -_id');
  }

  async getAllComments() {
    return await this.commentsModel
      .find()
      .populate('userId', 'name email gender -_id');
  }

  async count() {
    const count = await this.commentsModel.count();
    return count;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const commentExist = await this.commentsModel.findById(id).exec();
    if (!commentExist)
      throw new HttpException(
        'This comment  is not exist, please provide valid comment .',
        HttpStatus.BAD_REQUEST,
      );

    // this update function is gonna be a common update
    Object.keys(updateCommentDto).forEach((key) => {
      commentExist[key] = updateCommentDto[key];
    });

    const updatedComment = this.commentsModel
      .findByIdAndUpdate(id, commentExist, {
        new: true,
      })
      .exec();
    return updatedComment;
  }

  async remove(id: string) {
    const result = await this.commentsModel.findByIdAndRemove(id).exec();
    return result;
  }

  async findCommentById(id: string) {
    return await this.commentsModel.findById(id).exec();
  }

  async isCommentExist(id?: string) {
    if (id) return await this.findCommentById(id);

    return false;
  }
}
