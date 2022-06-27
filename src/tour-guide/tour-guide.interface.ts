import { Document } from "mongodb";

export default interface ITourGuide extends Document {
    title: string;
    description: string;
    rating: number;
    numOfDays:number;
    price:number;
    details:[object]
    }
    
export interface TourGuideQuery {
    rating: number;
    id: string;
  }
  