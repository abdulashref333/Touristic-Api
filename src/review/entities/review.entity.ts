import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectID } from 'bson';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { Model, Document } from 'mongoose';
import IReview from '../review.interface';

export interface IReviewModel extends Model<IReview> {}
@Schema({ timestamps: { createdAt: 'created', updatedAt: 'updated' } })
export class ReviewEntity extends Document {
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop()
  body: string;

  @Prop()
  itemId: string;

  @Prop()
  category: string;

  @Prop()
  rating: number;
}
export const ReviewEntitySchema = SchemaFactory.createForClass(ReviewEntity);
