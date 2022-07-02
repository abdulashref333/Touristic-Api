import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Model, Document } from 'mongoose';
import IProgram from '../programs.interface';

export type IProgramModel = Model<IProgram>;
@Schema({ timestamps: { createdAt: 'created', updatedAt: 'updated' } })
export class ProgramEntity extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop()
  description: string;

  @Prop({ default: 0 })
  countRating: number;

  @Prop({ default: 0 })
  sumRating: number;

  @Prop({ default: 0 })
  rating: number;

  @Prop()
  numOfDays: number;

  @Prop()
  price: number;

  @Prop()
  details: [object];
}
export const ProgramEntitySchema = SchemaFactory.createForClass(ProgramEntity);
