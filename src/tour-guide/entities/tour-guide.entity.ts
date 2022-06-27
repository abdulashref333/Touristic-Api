import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import ITourGuide from "../tour-guide.interface";
import { Model, Document } from 'mongoose';


export interface ITourGuideModel extends Model<ITourGuide> {
  
}
@Schema({ timestamps: { createdAt: 'created', updatedAt: 'updated' } })
export class TourGuideEntity extends Document {
  @Prop({ required: true })
  title: string;

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
export const TourGuideEntitySchema = SchemaFactory.createForClass(TourGuideEntity);