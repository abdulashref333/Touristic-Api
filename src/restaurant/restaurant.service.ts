import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRestaurantDto } from 'src/user/dto/create-restaurant.dto';
import {
  IRestaurantModel,
  RestaurantEntity,
} from './entities/restaurant.entity';
import { QueryService, InjectQueryService } from '@nestjs-query/core';
import { UpdateRestaurantDto } from 'src/user/dto/update.restaurant.dto';
import { UtilsService } from 'src/common/utils/utils.service';
@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel('Restaurant') private restaurantModel: IRestaurantModel,
    @InjectQueryService(RestaurantEntity)
    readonly RestaurantService: QueryService<RestaurantEntity>,
    private utilsService: UtilsService,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    const restaurantExist = await this.restaurantModel.findOne({
      location: createRestaurantDto.location,
      name: createRestaurantDto.name,
    });

    if (restaurantExist)
      throw new HttpException(
        'This restaurant is exist, please provide another restaurant.',
        HttpStatus.BAD_REQUEST,
      );

    const restaurant = {
      name: String(createRestaurantDto.name).toLowerCase().trimEnd(),
      desc: createRestaurantDto.description,
      location: createRestaurantDto.location,
      photos: createRestaurantDto.photos,
      menu: createRestaurantDto.menu,
      openTime: createRestaurantDto.openTime,
      closeTime: createRestaurantDto.closeTime,
      rating: 0,
      supportDelivery: createRestaurantDto.supportDelivery || false,
      restaurantPhoneNumber: createRestaurantDto.restaurantPhoneNumber || '',
    };
    const newRestaurant = await this.restaurantModel.create(restaurant);
    return newRestaurant.save();
  }

  async find(query) {
    return await this.RestaurantService.query(query);
  }

  async count() {
    return await this.restaurantModel.count();
  }

  async getAllRestaurants() {
    const restaurants = await this.restaurantModel.find().exec();
    const count = await this.restaurantModel.count();
    return { restaurants, count };
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    let restaurantExist = await this.restaurantModel.findById(id).exec();
    if (!restaurantExist)
      throw new HttpException(
        'This restaurant is not exist, please provide valid restaurant.',
        HttpStatus.BAD_REQUEST,
      );

    restaurantExist = this.utilsService.getUpdatedDoc(
      restaurantExist,
      updateRestaurantDto,
    );

    const updatedRestaurant = this.restaurantModel
      .findByIdAndUpdate(id, restaurantExist, {
        new: true,
      })
      .exec();
    return updatedRestaurant;
  }

  async remove(id: string) {
    const result = await this.restaurantModel.findByIdAndRemove(id).exec();
    return result;
  }

}
