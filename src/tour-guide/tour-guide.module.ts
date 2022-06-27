import { NestjsQueryMongooseModule } from '@nestjs-query/query-mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TourGuideEntity, TourGuideEntitySchema } from './entities/tour-guide.entity';
import { TourGuideController } from './tour-guide.controller';
import { TourGuideService } from './tour-guide.service';

@Module({
  imports:[
     MongooseModule.forFeature([{ name: 'TourGuide', schema: TourGuideEntitySchema }]),
     NestjsQueryMongooseModule.forFeature([
      {
        document: TourGuideEntity,
        name: 'TourGuide',
        schema: TourGuideEntity,
      },
    ]), ],
  controllers: [TourGuideController],
  providers: [TourGuideService]
})
export class TourGuideModule {}
