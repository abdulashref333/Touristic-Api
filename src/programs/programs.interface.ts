import { Document } from 'mongoose';

export default interface IProgram extends Document {
   userId:[{}];
    title: string;
    description: string;
    rating: number;
    numOfDays:number;
    price:number;
    details:[object]
    }
    
export interface ProgramQuery {
    rating: number;
    id: string;
  }
  