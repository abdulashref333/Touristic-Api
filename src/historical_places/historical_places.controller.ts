import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateHistoricalPlaceDto } from './dto/create-historical_places.dto';
import { UpdateHistoricalPlacesDto } from './dto/update-historical_places.dto';
import IHistoricalPlaces from './historical_places.interface';
import { HistoricalPlacesService } from './historical_places.service';
import { Request } from 'express';
import * as multer from 'multer';
import * as fs from 'fs';

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    const name = String(req.body.name).split(' ').join('_');
    const path = `./images/historical_places/${name}`;
    if (!fs.existsSync('./images/historical_places'))
      fs.mkdirSync('./images/historical_places');
    if (!fs.existsSync(path)) fs.mkdirSync(path);
    cb(null, path);
  },
});
@Controller('historical-places')
export class HistoricalPlacesController {
  constructor(
    private readonly historicalPlacesService: HistoricalPlacesService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('photos[]', 5, { storage }))
  async create(
    @Body() createHistoricalPlaceDto: CreateHistoricalPlaceDto,
    @UploadedFiles() files,
  ): Promise<IHistoricalPlaces> {
    console.log(createHistoricalPlaceDto);
    const photos = files ? files.map((photo) => photo.path) : [];

    return this.historicalPlacesService.create({
      ...createHistoricalPlaceDto,
      photos,
    });
  }

  @Get('/count')
  async count(): Promise<number> {
    return await this.historicalPlacesService.count();
  }

  @Get()
  async findAll(): Promise<any> {
    const historicalPlaces = await this.historicalPlacesService.getAllPlaces();
    const count = await this.historicalPlacesService.count();
    return { historicalPlaces, count };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHistoricalPlacesDto: UpdateHistoricalPlacesDto,
  ): Promise<IHistoricalPlaces> {
    return await this.historicalPlacesService.update(
      id,
      updateHistoricalPlacesDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IHistoricalPlaces> {
    return this.historicalPlacesService.remove(id);
  }
}
