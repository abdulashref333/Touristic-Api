import { NestjsQueryMongooseModule } from '@nestjs-query/query-mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoricalPlacesModule } from 'src/historical_places/historical_places.module';
import { ProgramModule } from 'src/programs/programs.module';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { ReviewEntity, ReviewEntitySchema } from './entities/review.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Review', schema: ReviewEntitySchema }]),
    NestjsQueryMongooseModule.forFeature([
      {
        document: ReviewEntity,
        name: 'Review',
        schema: ReviewEntity,
      },
    ]),
    ProgramModule,
    HistoricalPlacesModule,
    RestaurantModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
