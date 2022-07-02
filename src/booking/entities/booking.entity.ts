import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document, Model } from 'mongoose';

export type IBookingModel = Model<IBooking>;
@Schema({ timestamps: { createdAt: 'created', updatedAt: 'updated' } })
export class BookingEntity extends Document {
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  hostelOwnerId: string;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Hostel' })
  hostelId: string;

  @Prop()
  from: Date;

  @Prop()
  to: Date;

  @Prop()
  gender: string;

  @Prop()
  nationality: string;

  @Prop({ default: false })
  approved: boolean;

  @Prop({ default: false })
  rejected: boolean;
}
export const BookingEntitySchema = SchemaFactory.createForClass(BookingEntity);
