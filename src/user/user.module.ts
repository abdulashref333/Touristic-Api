import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserEntitySchema } from './entities/user.entity';
import { CommonModule } from 'src/common/common.module';
import { NestjsQueryMongooseModule } from '@nestjs-query/query-mongoose';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserEntitySchema }]),
    NestjsQueryMongooseModule.forFeature([
      {
        document: UserEntity,
        name: 'User',
        schema: UserEntitySchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
