import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateRestaurantDto } from 'src/user/dto/create-restaurant.dto';
import { UpdateRestaurantDto } from 'src/user/dto/update.restaurant.dto';
import IRestaurant from './restaurant.interface';
import { RestaurantService } from './restaurant.service';

@Controller('restaurants')
export class RestaurantController {
    constructor(private readonly restaurantService:RestaurantService){}
    @Post()
//     @ApiBody({ type: CreateUserDto })
//   @ApiOperation({ summary: 'Create User' })
//   @ApiResponse({ status: 403, description: 'Forbidden.' })
@UsePipes(new ValidationPipe({ transform: true }))

    async create(@Body() createRestaurantDto: CreateRestaurantDto): Promise<IRestaurant> {
        console.log(createRestaurantDto)
        return this.restaurantService.create(createRestaurantDto);
      }


//       @Get()
//   async findAll(@Query() query): Promise<any> {
//     Object.keys(query).forEach((f) => (query[f] = JSON.parse(query[f])));
//     // console.log({ query });
//     const users = await this.userService.findAll(query);
//     const count = await this.userService.count();
//     return { users, count };
//   }


@Get('/count')
async count(): Promise<number> {
  return await this.restaurantService.count();

}
@Get('')
async findAll(): Promise<any> {
  return await this.restaurantService.getAllObjects();
}



// @UsePipes(new ValidationPipe({ transform: true }))
@Patch(':id')
async update(
  @Param('id') id: string,
  @Body() updateRestaurantDto: UpdateRestaurantDto,
): Promise<IRestaurant> {
  return await this.restaurantService.update(id, updateRestaurantDto);
}


@Delete(':id')
async remove(@Param('id') id: string): Promise<IRestaurant> {
  return  this.restaurantService.remove(id);
}

}
