import { Document } from 'mongoose';
export default interface IHostel extends Document {
  userId: string;
  name: string;
  description: string;
  nightPrice: number;
  location: string;
  address: object;
}
