import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Model, Document } from 'mongoose';
import IHistoricalPlaces from '../historical_places.interface';

export type IHistoricalPlacesModel = Model<IHistoricalPlaces>;

@Schema({ timestamps: { createdAt: 'created', updatedAt: 'updated' } })
export class HistoricalPlacesEntity extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @ApiProperty()
  @Prop()
  story: string;

  @Prop()
  avgRating: number;

  @Prop()
  countRating: number;

  @Prop()
  sumRating: number;

  @Prop()
  photos: [string];

  @Prop()
  location: [string];

  @Prop()
  availableDays: [
    {
      day: string;
      from: number;
      to: number;
    },
  ];
}
export const HistoricalPlacesSchema = SchemaFactory.createForClass(
  HistoricalPlacesEntity,
);
