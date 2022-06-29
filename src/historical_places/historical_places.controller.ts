import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateHistoricalPlaceDto } from './dto/create-historical_places.dto';
import { UpdateHistoricalPlacesDto } from './dto/update-historical_places.dto';
import IHistoricalPlaces from './historical_places.interface';
import { HistoricalPlacesService } from './historical_places.service';

@Controller('historical_places')
export class HistoricalPlacesController {
    
    constructor(private readonly historicalPlacesService:HistoricalPlacesService){}

    @Post()
    async create(@Body() createHistoricalPlaceDto: CreateHistoricalPlaceDto): Promise<IHistoricalPlaces> {
        console.log(createHistoricalPlaceDto)
        return this.historicalPlacesService.create(createHistoricalPlaceDto);
      }

    @Get('/count')
    async count(): Promise<number> {
        return await this.historicalPlacesService.count();
      
      }


    @Get()
    async findAll(): Promise<any>{

       const historicalPlaces = await this.historicalPlacesService.getAllPlaces();
       const count = await this.historicalPlacesService.count();
       return { historicalPlaces, count };
     }
     

    @Patch(':id')
     async update(
       @Param('id') id: string,
       @Body() updateHistoricalPlacesDto: UpdateHistoricalPlacesDto,
     ): Promise<IHistoricalPlaces> {
       return await this.historicalPlacesService.update(id, updateHistoricalPlacesDto);
     }

    @Delete(':id')
     async remove(@Param('id') id: string): Promise<IHistoricalPlaces> {
       return  this.historicalPlacesService.remove(id);
     }

}
