import { NestjsQueryMongooseModule } from '@nestjs-query/query-mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogsModule } from 'src/blogs/blogs.module';
import { CommonModule } from 'src/common/common.module';
import { UserModule } from 'src/user/user.module';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsEntity, CommentsEntitySchema } from './entities/comment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comments', schema: CommentsEntitySchema }]),
    NestjsQueryMongooseModule.forFeature([
      {
        document: CommentsEntity,
        name: 'Comments',
        schema: CommentsEntitySchema,
      },
    ]),
    CommonModule,
    UserModule,
    BlogsModule,
  ],

  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
