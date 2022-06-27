import { Body, Controller, Post } from '@nestjs/common';
import { CreateTourGuideDto } from './dto/creat.tour-guide.dto';
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
 

}
