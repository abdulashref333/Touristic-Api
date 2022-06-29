import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Model, Document } from 'mongoose';
import IProgram from "../programs.interface";


export interface IProgramModel extends Model<IProgram> {
  
}
@Schema({ timestamps: { createdAt: 'created', updatedAt: 'updated' } })
export class ProgramEntity extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  userId: string;

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