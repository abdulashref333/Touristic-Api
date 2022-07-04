import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document, Model } from 'mongoose';
import IHostel from '../hostel.interface';

export type IHostelModel = Model<IHostel>;

@Schema({ timestamps: { createdAt: 'created', updatedAt: 'updated' } })
export class HostelEntity extends Document {
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  location: [string];

  @Prop({ type: Object })
  address: {};

  @Prop()
  photos: [string];

  @Prop()
  nightPrice: number;

  @Prop({ default: 0 })
  countRating: number;

  @Prop({ default: 0 })
  sumRating: number;

  @Prop({ default: 0 })
  rating: number;
}
export const HostelEntitySchema = SchemaFactory.createForClass(HostelEntity);
