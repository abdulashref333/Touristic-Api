import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { CommonModule } from 'src/common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NestjsQueryMongooseModule } from '@nestjs-query/query-mongoose';
import { BookingEntity, BookingEntitySchema } from './entities/booking.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    CommonModule,
    UserModule,
    MongooseModule.forFeature([
      { name: 'booking', schema: BookingEntitySchema },
    ]),
    NestjsQueryMongooseModule.forFeature([
      {
        document: BookingEntity,
        name: 'booking',
        schema: BookingEntitySchema,
      },
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
