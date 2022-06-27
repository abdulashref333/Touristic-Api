import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryService, InjectQueryService } from '@nestjs-query/core';import { ITourGuideModel, TourGuideEntity } from './entities/tour-guide.entity';
import { CreateTourGuideDto } from './dto/create.tour-guide.dto';
import ITourGuide from './tour-guide.interface';
import { UpdateTourGuideDto } from './dto/updateTourGuide.dto';

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
                description: createTourGuideDto.description,
                rating:createTourGuideDto.rating,
                numOfDays:createTourGuideDto.numOfDays,
                price:createTourGuideDto.price,
                details:createTourGuideDto.details
        }

      const newTourGuide = await this.tourGuideModel.create(tourGuide);
        return newTourGuide.save();
}


async count() {
     
    const count=await this.tourGuideModel.count()
     return await count;
 }
 
 async getAllTours() {
        
    return await this.tourGuideModel.find().exec();
}



 async remove(id: string) {
    const result = await this.tourGuideModel.findByIdAndRemove(id).exec();

    return result;
  }


async update(id: string, updateTourGuideDto: UpdateTourGuideDto) {
    const TourGuideExist = await this.tourGuideModel.findById(id).exec();
    if (!TourGuideExist)
      throw new HttpException(
        'This tour is not exist, please provide valid tour.',
        HttpStatus.BAD_REQUEST,
      );

    // this update function is gonna be a common update
    Object.keys(updateTourGuideDto).forEach((key) => {
        TourGuideExist[key] = updateTourGuideDto[key];
    });

    const updatedTourGuide = this.tourGuideModel
      .findByIdAndUpdate(id, TourGuideExist, {
        new: true,
      })
      .exec();
    return updatedTourGuide;
}



}