import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateRestaurantDto } from 'src/user/dto/create-restaurant.dto';
import { UpdateRestaurantDto } from 'src/user/dto/update.restaurant.dto';
import IRestaurant from './restaurant.interface';
import { RestaurantService } from './restaurant.service';
import { Request } from 'express';
import * as multer from 'multer';
// import { Request } from 'express';
import * as fs from 'fs';
import RoleGuard from 'src/auth/guards/role.guard';
import { Role } from 'src/user/entities/user.entity';

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    const name = String(req.body.name).split(' ').join('_');
    const path = `./images/restaurants/${name}`;

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
  @UseGuards(RoleGuard(Role.Admin))
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'photos[]', maxCount: 3 },
        { name: 'menu[]', maxCount: 1 },
      ],
      { storage: storage },
    ),
  )
  async create(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @UploadedFiles() files: { photos; menu },
    @Req() req: Request,
  ) {
    console.log({ createRestaurantDto });
    const photos = files
      ? files['photos[]'].map((photo) => photo.path)
      : req.body.photos;
    const menu = files
      ? files['menu []'].map((photo) => photo.path)
      : req.body.menu;
    const data = await this.restaurantService.create({
      ...createRestaurantDto,
      photos,
      menu,
    });
    return { data, msg: 'restaurant successful created.' };
  }

  @Post('photo/:id')
  @UseGuards(RoleGuard(Role.Admin))
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'photos[]', maxCount: 3 },
        { name: 'menu[]', maxCount: 1 },
      ],
      { storage: storage },
    ),
  )
  async uploadePhotos(
    @Param('id') id: string,
    @UploadedFiles() files: { photos; menu },
  ) {
    const photos = files['photos[]']
      ? files['photos[]'].map((photo) => photo.path)
      : [];
    const menu = files['menu[]']
      ? files['menu []'].map((photo) => photo.path)
      : [];
    return await this.restaurantService.update(id, { photos, menu });
  }

  @Get('/count')
  async count() {
    return { data: await this.restaurantService.count(), msg: 'msg' };
  }

  @Get(':id')
  async findOne(@Param() id: string): Promise<any> {
    return await this.restaurantService.getRestaurantById(id);
  }

  @Get()
  async findAll(@Query() query): Promise<any> {
    // console.log('i am here.');
    return await this.restaurantService.getAllRestaurants(query);
  }

  @Patch(':id')
  @UseGuards(RoleGuard(Role.Admin))
  async update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<IRestaurant> {
    return await this.restaurantService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard(Role.Admin))
  async remove(@Param('id') id: string): Promise<IRestaurant> {
    return this.restaurantService.remove(id);
  }
}
