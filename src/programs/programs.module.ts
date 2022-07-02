import { NestjsQueryMongooseModule } from '@nestjs-query/query-mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import { ProgramEntity, ProgramEntitySchema } from './entities/program.entity';
import { ProgramController } from './programs.controller';
import { ProgramService } from './programs.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Program', schema: ProgramEntitySchema },
    ]),
    NestjsQueryMongooseModule.forFeature([
      {
        document: ProgramEntity,
        name: 'Program',
        schema: ProgramEntity,
      },
    ]),
    CommonModule,
  ],
  controllers: [ProgramController],
  providers: [ProgramService],
  exports: [ProgramService],
})
export class ProgramModule {}
