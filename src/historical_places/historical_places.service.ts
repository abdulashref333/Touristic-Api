import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  HistoricalPlacesEntity,
  IHistoricalPlacesModel,
} from './entities/historical_places.entity';
import { QueryService, InjectQueryService } from '@nestjs-query/core';
import { UpdateHistoricalPlacesDto } from './dto/update-historical_places.dto';
import { UtilsService } from 'src/common/utils/utils.service';

@Injectable()
export class HistoricalPlacesService {
  constructor(
    @InjectModel('HistoricalPlaces')
    private historicalPlacesModel: IHistoricalPlacesModel,
    @InjectQueryService(HistoricalPlacesEntity)
    readonly historicalPlacesService: QueryService<HistoricalPlacesEntity>,
    private utileService: UtilsService,
  ) {}

  async create(createHistoricalPlaceDto) {
    const historicalPlace = {
      name: createHistoricalPlaceDto.name,
      story: createHistoricalPlaceDto.story,
      rating: createHistoricalPlaceDto.avgRating,
      reviews: createHistoricalPlaceDto.reviews,
      photos: createHistoricalPlaceDto.photos,
      location: createHistoricalPlaceDto.location,
      availableDays: createHistoricalPlaceDto.availableDays,
      address: createHistoricalPlaceDto.address,
    };

    const newHistoricalPlace = await this.historicalPlacesModel.create(
      historicalPlace,
    );
    return newHistoricalPlace.save();
  }

  async count() {
    const count = await this.historicalPlacesModel.count();
    return count;
  }

  async getAllPlaces(filter) {
    filter = this.utileService.parseQuery(filter);

    return filter.length !== 0
      ? await this.historicalPlacesService.query(filter)
      : await this.historicalPlacesModel.find().limit(10).exec();
  }

  async getPlaceById(id: string) {
    return await this.historicalPlacesModel.findById(id);
  }

  async remove(id: string) {
    const result = await this.historicalPlacesModel
      .findByIdAndRemove(id)
      .exec();
    return result;
  }

  async update(
    id: string,
    updateHistoricalPlacesDto: UpdateHistoricalPlacesDto,
  ) {
    const historicalPlacesExist = await this.historicalPlacesModel
      .findById(id)
      .exec();
    if (!historicalPlacesExist)
      throw new HttpException(
        'This historical Places  is not exist, please provide valid historical Places .',
        HttpStatus.BAD_REQUEST,
      );

    // this update function is gonna be a common update
    Object.keys(updateHistoricalPlacesDto).forEach((key) => {
      historicalPlacesExist[key] = updateHistoricalPlacesDto[key];
    });

    const updatedHistorical = this.historicalPlacesModel
      .findByIdAndUpdate(id, historicalPlacesExist, {
        new: true,
      })
      .exec();
    return updatedHistorical;
  }
}
