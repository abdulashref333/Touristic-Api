import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { query } from 'express';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    console.log(createBookingDto);
    return this.bookingService.create(createBookingDto);
  }

  // @Get()
  // findAll(@Query() query) {
  //   return this.bookingService.findAll(query);
  // }

  @Get('/user/:id')
  findBookings(@Param('id') id: string) {
    return this.bookingService.findBookingsForUser(id);
  }

  @Get('/owner/:id')
  findBookingsForOwner(@Param('id') id: string) {
    console.log('i am here.');
    return this.bookingService.findBookingsHostelOwner(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(id);
  }
}
