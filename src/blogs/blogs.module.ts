import { NestjsQueryMongooseModule } from '@nestjs-query/query-mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import { UserModule } from 'src/user/user.module';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { BlogsEntity, BlogsSchema } from './entities/blog.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Blogs', schema: BlogsSchema }]),
    NestjsQueryMongooseModule.forFeature([
      {
        document: BlogsEntity,
        name: 'Blogs',
        schema: BlogsSchema,
      },
    ]),
    CommonModule,
    UserModule,
  ],

  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
