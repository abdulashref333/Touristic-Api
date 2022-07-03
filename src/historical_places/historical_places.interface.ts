import { Document } from 'mongoose';

export default interface IHistoricalPlaces extends Document {
  name: string;
  story: string;
  avgRating: number;
  countRating: number;
  sumRating: number;
  reviews: [{ user: string; review: string; rating: number }];
  photos: [string];
  location: string;
  address: object;
  availableDays: [
    {
      day: string;
      from: number;
      to: number;
    },
  ];
}

export interface HistoricalPlacesQuery {
  id: string;
}
