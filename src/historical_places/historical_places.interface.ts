import { Document } from 'mongoose';

export default interface IHistoricalPlaces extends Document {
    name:string
    story:string
    ratings:number
    reviews:[{user:string ,review:string,}]
    photos:[string]
    location:[string]
    availableDays: 
    [{
     day:string,
     from:number,
     to:number
    
    }]
    
}

export interface HistoricalPlacesQuery {
  id: string;
}