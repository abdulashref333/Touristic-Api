import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTourGuideDto } from './dto/create.tour-guide.dto';
import { UpdateTourGuideDto } from './dto/updateTourGuide.dto';

import ITourGuide from './tour-guide.interface';
import { TourGuideService } from './tour-guide.service';

@Controller('tour-guide')
export class TourGuideController {
 constructor(private readonly tourGuideService:TourGuideService){}

 @Post()
     async create(@Body() createTourGuideDto: CreateTourGuideDto): Promise<ITourGuide> {
         console.log(createTourGuideDto)
         return this.tourGuideService.create(createTourGuideDto);
       }
 

       @Get('/count')
       async count(): Promise<number> {
         return await this.tourGuideService.count();
       
       }
       @Get('')
       async findAll(): Promise<any>{

        const tourGuide = await this.tourGuideService.getAllTours();
        const count = await this.tourGuideService.count();
        return { tourGuide, count };
      }
       

@Delete(':id')
async remove(@Param('id') id: string): Promise<ITourGuide> {
  return  this.tourGuideService.remove(id);
}


@Patch(':id')
async update(
  @Param('id') id: string,
  @Body() updateTourGuideDto: UpdateTourGuideDto,
): Promise<ITourGuide> {
  return await this.tourGuideService.update(id, updateTourGuideDto);
}

}


