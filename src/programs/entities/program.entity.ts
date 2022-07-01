import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Model, Document } from 'mongoose';
import IProgram from '../programs.interface';

export type IProgramModel = Model<IProgram>;
@Schema({ timestamps: { createdAt: 'created', updatedAt: 'updated' } })
export class ProgramEntity extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({required: true ,type:mongoose.Types.ObjectId, ref:"User"})
  userId: [{}];

  @Prop()
  description: string;

  @Prop()
  rating: number;

  @Prop()
  numOfDays: number;

  @Prop()
  price: number;

  @Prop()
  details: [object];
}
export const ProgramEntitySchema = SchemaFactory.createForClass(ProgramEntity);
