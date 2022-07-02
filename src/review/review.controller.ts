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
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import IReview from './review.interface';
import { ReviewService } from './review.service';
import { query, Request } from 'express';
import RoleGuard from 'src/auth/guards/role.guard';
import { Role } from 'src/user/entities/user.entity';
import { GetReviewDto } from './dto/get-review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly ReviewService: ReviewService) {}

  // async findAll(@Req() req: Request): Promise<any> {
  //   const params = { ...req.body, ...req.query, ...req.params }; // this for merging all objects.
  //   if (!params || !params.itemId || !params.category)
  //     throw new HttpException(
  //       'Invalid Request, should send item_id and category',
  //       HttpStatus.BAD_REQUEST,
  //     );
  // }

  @Post()
  @ApiBody({ type: CreateReviewDto })
  @ApiOperation({ summary: 'Create Review' })
  @ApiResponse({ status: 400, description: 'BadRequest.' })
  async create(@Body() createReviewDto: CreateReviewDto): Promise<IReview> {
    return this.ReviewService.create(createReviewDto);
  }

  @Get('/:id/:category')
  async getItemReviews(
    @Param('id') id: string,
    @Param('category') category: string,
  ): Promise<any> {
    return await this.ReviewService.getItemReview(id, category);
  }

  @Get()
  async findAllReviews(@Query() query: GetReviewDto): Promise<any> {
    const reviews = await this.ReviewService.getAllReviews(
      query.itemId,
      query.category,
    );
    const count = await this.ReviewService.count();
    return { reviews, count };
  }

  @Patch(':id')
  @ApiBody({ type: UpdateReviewDto })
  @ApiOperation({ summary: 'Update Review' })
  @UseGuards(RoleGuard(Role.Admin))
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<IReview> {
    return await this.ReviewService.update(id, updateReviewDto);
  }
  // TODO: Add delete route
  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete Review' })
  // @UseGuards(RoleGuard(Role.Admin))
  // async remove(@Param('id') id: string): Promise<IReview> {}
}
