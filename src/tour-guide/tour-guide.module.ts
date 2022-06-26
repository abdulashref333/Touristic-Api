import { Module } from '@nestjs/common';
import { TourGuideController } from './tour-guide.controller';
import { TourGuideService } from './tour-guide.service';

@Module({
  controllers: [TourGuideController],
  providers: [TourGuideService]
})
export class TourGuideModule {}
