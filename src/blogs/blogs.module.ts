import { NestjsQueryMongooseModule } from '@nestjs-query/query-mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { BlogsEntity, BlogsSchema } from './entities/blog.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:"Blogs",schema:BlogsSchema}]),
  NestjsQueryMongooseModule.forFeature([
   {
     document: BlogsEntity,
     name: 'Blogs',
     schema: BlogsSchema}])] ,
 

  controllers: [BlogsController],
  providers: [BlogsService]
})
export class BlogsModule {}
