import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IReviewModel, ReviewEntity } from './entities/review.entity';
import { QueryService, InjectQueryService } from '@nestjs-query/core';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('Review') private ReviewModel: IReviewModel,
    @InjectQueryService(ReviewEntity)
    readonly reviewService: QueryService<ReviewEntity>,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const Review = {
      userId: createReviewDto.userId,
      itemId: createReviewDto.itemId,
      category: createReviewDto.category,
      rating: createReviewDto.rating,
      body: createReviewDto.body,
    };

    const newReview = await this.ReviewModel.create(Review);
    return newReview.save();
  }

  async getItemReview(id: string, category: string) {
    return await this.ReviewModel.find({ category: category, itemId: id })
      .select('userId body rating')
      .populate('userId', 'name email gender -_id');
  }

  async getAllReviews() {
    return await this.ReviewModel.find().populate(
      'userId',
      'name email gender -_id',
    );
  }

  async count() {
    const count = await this.ReviewModel.count();
    return count;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const ReviewExist = await this.ReviewModel.findById(id).exec();
    if (!ReviewExist)
      throw new HttpException(
        'This Review is not exist, please provide valid Review.',
        HttpStatus.BAD_REQUEST,
      );

    // this update function is gonna be a common update
    Object.keys(updateReviewDto).forEach((key) => {
      ReviewExist[key] = updateReviewDto[key];
    });

    const updatedReview = this.ReviewModel.findByIdAndUpdate(id, ReviewExist, {
      new: true,
    }).exec();
    return updatedReview;
  }
}
