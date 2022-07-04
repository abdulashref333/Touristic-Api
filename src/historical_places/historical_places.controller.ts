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
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateHistoricalPlaceDto } from './dto/create-historical_places.dto';
import { UpdateHistoricalPlacesDto } from './dto/update-historical_places.dto';
import IHistoricalPlaces from './historical_places.interface';
import { HistoricalPlacesService } from './historical_places.service';
import { Request } from 'express';
import * as multer from 'multer';
import * as fs from 'fs';
import RoleGuard from 'src/auth/guards/role.guard';
import { Role } from 'src/user/entities/user.entity';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { filter } from 'rxjs';

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    const name = String(req.body.name).split(' ').join('_');
    const path = `./images/historical_places/${name}`;

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
  @ApiBody({ type: CreateHistoricalPlaceDto })
  @ApiOperation({ summary: 'Create Historical Place' })
  @ApiResponse({ status: 400, description: 'BadRequest.' })
  @UseInterceptors(FilesInterceptor('photos[]', 5, { storage }))
  @UseGuards(RoleGuard(Role.Admin))
  async create(
    @Body() createHistoricalPlaceDto: CreateHistoricalPlaceDto,
    @UploadedFiles() files,
    @Req() req: Request,
  ): Promise<IHistoricalPlaces> {
    console.log(createHistoricalPlaceDto);

    const photos = files ? files.map((photo) => photo.path) : req.body.photos;

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
  async findAll(@Query() query): Promise<any> {
    const historicalPlaces = await this.historicalPlacesService.getAllPlaces(
      query,
    );
    const count = await this.historicalPlacesService.count();
    return { historicalPlaces, count };
  }

  @Patch(':id')
  @ApiBody({ type: UpdateHistoricalPlacesDto })
  @ApiOperation({ summary: 'Update Historical Place' })
  @UseGuards(RoleGuard(Role.Admin))
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
  @ApiOperation({ summary: 'Delete Historical Place' })
  @UseGuards(RoleGuard(Role.Admin))
  async remove(@Param('id') id: string): Promise<IHistoricalPlaces> {
    return this.historicalPlacesService.remove(id);
  }
}
