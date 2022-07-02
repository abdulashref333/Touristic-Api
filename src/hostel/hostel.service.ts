import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateHostelDto } from './dto/update-hostel.dto';
import { QueryService, InjectQueryService } from '@nestjs-query/core';
import { HostelEntity, IHostelModel } from './entities/hostel.entity';
import { UserService } from 'src/user/user.service';
import { UtilsService } from 'src/common/utils/utils.service';

@Injectable()
export class HostelService {
  constructor(
    @InjectModel('Hostel') private hostelModel: IHostelModel,
    @InjectQueryService(HostelEntity)
    readonly hostelService: QueryService<HostelEntity>,
    private userService: UserService,
    private utilsService: UtilsService,
  ) {}
  async create(createHostelDto) {
    const userExist = this.userService.findUserByEmail(createHostelDto.email);
    if (!userExist)
      throw new HttpException('No user exists.', HttpStatus.BAD_REQUEST);

    const hostel = {
      userId: (await userExist)._id,
      name: createHostelDto.name,
      description: createHostelDto.description,
      location: createHostelDto.location,
      nightPrice: createHostelDto.nightPrice,
      photos: createHostelDto.photos || [],
    };

    const newHostel = await this.hostelModel.create(hostel);
    return await newHostel.save();
  }

  async findAll(filter) {
    filter = this.utilsService.parseQuery(filter);
    return Object.keys(filter).length !== 0
      ? await this.hostelService.query(filter)
      : await this.hostelModel
          .find()
          .limit(10)
          .populate('userId', 'name email avatar gender -_id')
          .exec();
  }

  findOne(id: string) {
    return this.hostelModel.findById(id);
  }

  async update(id: string, updateHostelDto: UpdateHostelDto) {
    let hostelExist = await this.hostelModel.findById(id);
    if (!hostelExist)
      throw new HttpException(
        'This hostel is not exist, please provide valid hostel id.',
        HttpStatus.BAD_REQUEST,
      );

    // console.log('b:', { hostelExist });

    hostelExist = this.utilsService.getUpdatedDoc(hostelExist, updateHostelDto);

    // console.log('a:', { hostelExist });

    const updatedHostel = this.hostelModel
      .findByIdAndUpdate(id, hostelExist, { new: true })
      .exec();
    return updatedHostel;
  }

  async remove(id: string) {
    return await this.hostelModel.findByIdAndRemove(id);
  }
}
