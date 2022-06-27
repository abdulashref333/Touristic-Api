import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryService, InjectQueryService } from '@nestjs-query/core';import { ITourGuideModel, TourGuideEntity } from './entities/tour-guide.entity';
import { CreateTourGuideDto } from './dto/creat.tour-guide.dto';

@Injectable()
export class TourGuideService {
    constructor(
        @InjectModel('TourGuide') private tourGuideModel: ITourGuideModel,
        @InjectQueryService(TourGuideEntity)
        readonly TourGuideService: QueryService<TourGuideEntity>,
      ) {}
      async create(createTourGuideDto: CreateTourGuideDto) {
        const tourGuideExist = await this.tourGuideModel.findOne({
            title: createTourGuideDto.title,
          });
        
        
          if (tourGuideExist)
            throw new HttpException(
              'This TourGuide is exist, please provide another TourGuide.',
              HttpStatus.BAD_REQUEST,
            );



            const tourGuide = {
                title: String(createTourGuideDto.title).toLowerCase().trim() ,
                desc: createTourGuideDto.description,
                rating:createTourGuideDto.rating,
                numOfDays:createTourGuideDto.numOfDays,
                price:createTourGuideDto.price,
                details:createTourGuideDto.details
        }

      const newTourGuide = await this.tourGuideModel.create(tourGuide);
        return newTourGuide.save();


}
}