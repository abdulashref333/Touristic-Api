import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  IRestaurantModel,
  RestaurantEntity,
} from './entities/restaurant.entity';
import { QueryService, InjectQueryService } from '@nestjs-query/core';
import { UpdateRestaurantDto } from 'src/user/dto/update.restaurant.dto';
import { UtilsService } from 'src/common/utils/utils.service';
import { SortDirection } from '@nestjs-query/core';
@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel('Restaurant') private restaurantModel: IRestaurantModel,
    @InjectQueryService(RestaurantEntity)
    readonly RestaurantService: QueryService<RestaurantEntity>,
    private utilsService: UtilsService,
  ) {}

  async create(createRestaurantDto) {
    const restaurantExist = await this.restaurantModel.findOne({
      location: createRestaurantDto.location,
      name: createRestaurantDto.name,
    });

    if (restaurantExist)
      throw new HttpException(
        'This restaurant is exist, please provide another restaurant.',
        HttpStatus.BAD_REQUEST,
      );

    console.log({ createRestaurantDto });
    const restaurant = {
      name: createRestaurantDto.name,
      desc: createRestaurantDto.description,
      location: createRestaurantDto.location,
      address: createRestaurantDto.address,
      photos: createRestaurantDto.photos,
      menu: createRestaurantDto.menu,
      openTime: createRestaurantDto.openTime,
      closeTime: createRestaurantDto.closeTime,
      rating: 0,
      supportDelivery: createRestaurantDto.supportDelivery || false,
      restaurantPhoneNumber: createRestaurantDto.restaurantPhoneNumber || '',
    };
    console.log({ restaurant });

    const newRestaurant = await this.restaurantModel.create(restaurant);
    return newRestaurant.save();
  }

  async find(query) {
    return await this.RestaurantService.query(query);
  }

  async getRestaurantById(id: string) {
    return await this.restaurantModel.findById(id);
  }
  async count() {
    return this.restaurantModel.count();
  }

  async getAllRestaurants(filter) {
    filter = this.utilsService.parseQuery(filter);
    const restaurants =
      Object.keys(filter).length !== 0
        ? await this.RestaurantService.query(filter)
        : await this.restaurantModel.find().limit(10).exec();
    // console.log('i am here.');
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
