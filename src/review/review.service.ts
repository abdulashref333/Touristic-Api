import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IReviewModel, ReviewEntity } from './entities/review.entity';
import { QueryService, InjectQueryService } from '@nestjs-query/core';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ProgramService } from 'src/programs/programs.service';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { HistoricalPlacesService } from 'src/historical_places/historical_places.service';
import { HostelService } from 'src/hostel/hostel.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('Review') private ReviewModel: IReviewModel,
    @InjectQueryService(ReviewEntity)
    readonly reviewService: QueryService<ReviewEntity>,
    private programService: ProgramService,
    private restaurantService: RestaurantService,
    private historicalService: HistoricalPlacesService,
    private hostelService: HostelService,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const { category, itemId, rating } = createReviewDto;
    const Review = {
      userId: createReviewDto.userId,
      body: createReviewDto.body,
      category,
      itemId,
      rating,
    };

    const newReview = await this.ReviewModel.create(Review);
    await this.updateItem(category, itemId, rating);
    return newReview.save();
  }

  async getItemReview(id: string, category: string) {
    return await this.ReviewModel.find({ category: category, itemId: id })
      .select('userId body rating')
      .populate('userId', 'name email avatar gender -_id');
  }

  async getAllReviews(itemId: string, category: string) {
    return await this.ReviewModel.find({ itemId, category }).populate(
      'userId',
      'name email avatar gender -_id',
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

  async delete(id: string) {
    return await this.ReviewModel.findByIdAndRemove(id);
  }

  private async updateItem(category: string, item_id: string, rating: number) {
    let item;
    if (category == 'Program') {
      item = await this.programService.getProgramById(item_id);
      this.calculateNewRating(rating, item);
      this.programService.update(item_id, item);
    } else if (category == 'Restaurant') {
      item = await this.restaurantService.getRestaurantById(item_id);
      this.calculateNewRating(rating, item);
      this.restaurantService.update(item_id, item);
    } else if (category == 'Hostel') {
      item = await this.hostelService.findOne(item_id);
      this.calculateNewRating(rating, item);
      this.hostelService.update(item_id, item);
    } else {
      item = await this.historicalService.getPlaceById(item_id);
      this.calculateNewRating(rating, item);
      this.historicalService.update(item_id, item);
    }
  }

  private calculateNewRating(rating: number, item) {
    item.countRating++;
    item.sumRating += rating;
    item.rating = (item.sumRating / item.countRating).toFixed(2);
  }
}
