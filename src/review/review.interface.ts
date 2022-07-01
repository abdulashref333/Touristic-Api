import { Document } from 'mongoose';

export default interface IReview extends Document {
  userId: string;
  rating: number;
  body: string;
  category: string;
  itemId: string;
}

export interface ReviewQuery {
  rating: number;
  id: string;
}
