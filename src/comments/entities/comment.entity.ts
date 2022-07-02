import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Model, Document } from 'mongoose';
import IComments from 'src/comments/comments.interface';

export type ICommentsModel = Model<IComments>;
@Schema({ timestamps: { createdAt: 'created', updatedAt: 'updated' } })
export class CommentsEntity extends Document {
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ required: true })
  blogId: string;

  @Prop()
  body: string;
}
export const CommentsEntitySchema =
  SchemaFactory.createForClass(CommentsEntity);
