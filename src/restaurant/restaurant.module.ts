import { NestjsQueryMongooseModule } from '@nestjs-query/query-mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import { ImageModule } from 'src/image/image.module';
import {
  RestaurantEntity,
  RestaurantEntitySchema,
} from 'src/restaurant/entities/restaurant.entity';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Restaurant', schema: RestaurantEntitySchema },
    ]),
    NestjsQueryMongooseModule.forFeature([
      {
        document: RestaurantEntity,
        name: 'Restaurant',
        schema: RestaurantEntity,
      },
    ]),
    CommonModule,
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
  exports: [RestaurantService],
})
export class RestaurantModule {}
