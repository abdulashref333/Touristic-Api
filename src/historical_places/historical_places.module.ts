import { NestjsQueryMongooseModule } from '@nestjs-query/query-mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import {
  HistoricalPlacesEntity,
  HistoricalPlacesSchema,
} from './entities/historical_places.entity';
import { HistoricalPlacesController } from './historical_places.controller';
import { HistoricalPlacesService } from './historical_places.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'HistoricalPlaces', schema: HistoricalPlacesSchema },
    ]),
    NestjsQueryMongooseModule.forFeature([
      {
        document: HistoricalPlacesEntity,
        name: 'HistoricalPlaces',
        schema: HistoricalPlacesSchema,
      },
    ]),
    CommonModule,
  ],

  controllers: [HistoricalPlacesController],
  providers: [HistoricalPlacesService],
  exports: [HistoricalPlacesService],
})
export class HistoricalPlacesModule {}
