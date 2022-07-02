import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingEntity, IBookingModel } from './entities/booking.entity';
// import { QueryService } from '@nestjs-query/core';
import { QueryService, InjectQueryService } from '@nestjs-query/core';
import { UtilsService } from 'src/common/utils/utils.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel('booking') private bookingModel: IBookingModel,
    @InjectQueryService(BookingEntity)
    readonly bookingService: QueryService<BookingEntity>,
    private utileService: UtilsService,
    private userService: UserService,
  ) {}
  async create(createBookingDto: CreateBookingDto) {
    const userExist = await this.userService.findUserById(
      createBookingDto.userId,
    );
    if (!userExist)
      throw new HttpException(
        `user not found with ${createBookingDto.userId}`,
        HttpStatus.BAD_REQUEST,
      );
    const booking = {
      userId: createBookingDto.userId,
      hostelOwnerId: createBookingDto.hostelOwnerId,
      hostelId: createBookingDto.hostelId,
      nationality: createBookingDto.nationality,
      gender: createBookingDto.gender,
      from: createBookingDto.from,
      to: createBookingDto.to,
    };
    const newBooking = await this.bookingModel.create(booking);
    return newBooking.save();
  }

  async findAll(filter) {
    filter = this.utileService.parseQuery(filter);
    // console.log({ filter });
    filter.filter = {
      ...filter.filter,
    };
    console.log(filter);
    return Object.keys(filter).length !== 0
      ? await this.bookingService.query(filter)
      : await this.bookingModel
          .find()
          .populate('userId hostelOwnerId', 'name email avatar gender -_id');
  }

  async findBookingsForUser(userId: string) {
    return await this.bookingModel
      .find({ userId })
      .populate('userId hostelOwnerId');
  }

  async findBookingsHostelOwner(hostelOwnerId: string) {
    return await this.bookingModel
      .find({ hostelOwnerId })
      .populate('userId hostelOwnerId')
      .exec();
  }

  async findOne(id: string) {
    return await (
      await this.bookingModel.findById(id)
    ).populate('userId hostelOwnerId');
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    let bookingExist = await this.bookingModel.findOne({
      _id: id,
      approved: !updateBookingDto.approved,
    });
    // console.log({ blogExist });

    if (!bookingExist)
      throw new HttpException(
        'This blog  is not exist, please provide valid blog .',
        HttpStatus.BAD_REQUEST,
      );

    // this update function is gonna be a common update
    bookingExist = this.utileService.getUpdatedDoc(
      bookingExist,
      updateBookingDto,
    );

    // console.log({ blogExist });
    const updatedBooking = this.bookingModel
      .findByIdAndUpdate(id, bookingExist, {
        new: true,
      })
      .exec();
    return updatedBooking;
  }

  async remove(id: string) {
    return await this.bookingModel.findByIdAndRemove(id);
  }
}
