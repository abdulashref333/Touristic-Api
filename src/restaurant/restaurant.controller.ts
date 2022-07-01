import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateRestaurantDto } from 'src/user/dto/create-restaurant.dto';
import { UpdateRestaurantDto } from 'src/user/dto/update.restaurant.dto';
import IRestaurant from './restaurant.interface';
import { RestaurantService } from './restaurant.service';

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}
  @Post()
  @ApiBody({ type: CreateRestaurantDto })
  @ApiOperation({ summary: 'Create Restaurant' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    const data = await this.restaurantService.create(createRestaurantDto);
    return { data, msg: 'successfull created.' };
  }

  @Get('/count')
  async count() {
    return { data: await this.restaurantService.count(), msg: 'msg' };
  }

  @Get('')
  async findAll(): Promise<any> {
    return await this.restaurantService.getAllRestaurants();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<IRestaurant> {
    return await this.restaurantService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IRestaurant> {
    return this.restaurantService.remove(id);
  }
}
