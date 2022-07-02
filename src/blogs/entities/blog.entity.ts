import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Model, Document } from 'mongoose';
import IBlogs from '../blogs.interface';

export type IBlogsModel = Model<IBlogs>;

@Schema({ timestamps: { createdAt: 'created', updatedAt: 'updated' } })
export class BlogsEntity extends Document {
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  userId: string;

  @ApiProperty()
  @Prop()
  title: string;

  @Prop()
  subtitle: string;

  @Prop()
  photo: [string];

  @Prop()
  body: string;

  @Prop()
  tags: [string];

  @Prop()
  date: Date;

  @Prop({ default: false })
  approved: boolean;

  @Prop({ default: false })
  rejected: boolean;
}
export const BlogsSchema = SchemaFactory.createForClass(BlogsEntity);
BlogsSchema.pre(['find', 'findOne'], function (cb) {
  // const query = this.getQuery();
  // query.approved = query.approved !== undefined ? query.approved : true;
  // // console.log(query);
  // this.setQuery(query);
  cb();
});
