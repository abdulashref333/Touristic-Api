import { Module } from '@nestjs/common';
import { HostelService } from './hostel.service';
import { HostelController } from './hostel.controller';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NestjsQueryMongooseModule } from '@nestjs-query/query-mongoose';
import { HostelEntity, HostelEntitySchema } from './entities/hostel.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    UserModule,
    CommonModule,
    MongooseModule.forFeature([{ name: 'Hostel', schema: HostelEntitySchema }]),
    NestjsQueryMongooseModule.forFeature([
      {
        document: HostelEntity,
        name: 'Hostel',
        schema: HostelEntity,
      },
    ]),
  ],
  controllers: [HostelController],
  providers: [HostelService],
  exports: [HostelService],
})
export class HostelModule {}
