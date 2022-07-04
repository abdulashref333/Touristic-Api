import { Document } from 'mongoose';

export default interface IRestaurant extends Document {
  name: string;
  description: string;
  location: string;
  address: object;
  photos: string;
  reviewsRated: Number;
  menu: string;
  openTime: string;
  closeTime: string;
  isSupportDelivery: boolean;
}

export interface RestaurantQuery {
  rating: number;
  id: string;
}
