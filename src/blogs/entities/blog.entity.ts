import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { Model, Document } from 'mongoose';
import IBlogs from '../blogs.interface';

export interface IBlogsModel extends Model<IBlogs> {}

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

  @Prop()
  approved: boolean;
}
export const BlogsSchema = SchemaFactory.createForClass(BlogsEntity);
