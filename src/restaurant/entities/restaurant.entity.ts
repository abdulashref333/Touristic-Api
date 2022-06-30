import IRestaurant from 'src/restaurant/restaurant.interface';
import { Model, Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type IRestaurantModel = Model<IRestaurant>;

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
  rating: number;

  @Prop()
  menu: [string];

  @Prop()
  availableDays: [string];

  @Prop()
  openTime: number;

  @Prop()
  closeTime: number;

  @Prop()
  restaurantPhoneNumber: string;

  @Prop()
  supportDelivery: boolean;
}
export const RestaurantEntitySchema =
  SchemaFactory.createForClass(RestaurantEntity);
