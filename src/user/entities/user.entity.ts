import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Model, Document } from 'mongoose';
import IUser from '../user.interface';
import * as bcrypt from 'bcrypt';

export interface IUserModel extends Model<IUser> {
  // Model is imported from mongoose
  // you can put your statics methods here
  findByEmail: (email: string) => IUser;
}

export enum Role {
  User = 'User',
  Admin = 'Admin',
  TourGuide = 'Tour_Guide',
  HostelOwner = 'Hostel_Owner',
}
@Schema({ timestamps: { createdAt: 'created', updatedAt: 'updated' } })
export class UserEntity extends Document {
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 1, description: 'The email of the user' })
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone_number: string;

  @Prop()
  nationality: string;

  @Prop()
  gender: string;

  @Prop()
  avatar: string;

  @Prop({ default: Role.User, enum: Role })
  role: Role;
}
export const UserEntitySchema = SchemaFactory.createForClass(UserEntity);

UserEntitySchema.pre('save', async function () {
  const saltOrRounds = 10;
  const password = this.password;
  const hash = await bcrypt.hash(password, saltOrRounds);
  this.password = hash;
});

UserEntitySchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});
// UserEntitySchema.methods.findByEmail = async function (email: string) {
//   return await this.findOne({ email }).exec();
// };
// UserSchema.static('someAction', function () {
//   return 'something.';
// });

UserEntitySchema.statics.findByEmail = async function (email: string) {
  return await this.findOne({ email }).exec();
};
