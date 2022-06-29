import IRestaurant from "src/restaurant/restaurant.interface";
import { Model, Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export interface IRestaurantModel extends Model<IRestaurant> {
  
}

@Schema({ timestamps: { createdAt: 'created', updatedAt: 'updated' } })
export class RestaurantEntity extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  location: [string];

  @Prop()
  photos: [string];

  @Prop()
  rating: Number;

  @Prop()
  menu:[string];
 
  @Prop()
  availableDays:[string];

  @Prop()
  openTime:Number;

  @Prop()
  closeTime:Number;

  @Prop()
  restaurantPhoneNumber:string;

  @Prop()
  supportDelivery:boolean;

}
export const RestaurantEntitySchema = SchemaFactory.createForClass(RestaurantEntity);