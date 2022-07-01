import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateRestaurantDto } from 'src/user/dto/create-restaurant.dto';
import { UpdateRestaurantDto } from 'src/user/dto/update.restaurant.dto';
import IRestaurant from './restaurant.interface';
import { RestaurantService } from './restaurant.service';
import { Request, Response } from 'express';
import * as multer from 'multer';
import * as fs from 'fs';

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    const name = String(req.body.name).split(' ').join('_');
    const path = `./images/restaurants/${name}`;
    if (!fs.existsSync('./images/restaurants'))
      fs.mkdirSync('./images/restaurants');
    if (!fs.existsSync(path)) fs.mkdirSync(path);
    cb(null, path);
  },
});
@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}
  @Post()
  @ApiBody({ type: CreateRestaurantDto })
  @ApiOperation({ summary: 'Create Restaurant' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'photos[]', maxCount: 3 },
        { name: 'menu[]', maxCount: 1 },
      ],
      {
        storage: storage,
      },
    ),
  )
  async create(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @UploadedFiles() files: { photos; menu },
  ) {
    // console.log({ photos: files['photos[]'], menues: files['menu[]'] });
    const photos = files['photos[]'].map((photo) => photo.path);
    const menu = files['menu[]'].map((photo) => photo.path);
    const data = await this.restaurantService.create({
      createRestaurantDto,
      photos,
      menu,
    });
    return { data, msg: 'restaurant successfull created.' };
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
