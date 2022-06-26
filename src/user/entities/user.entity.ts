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

/*
// export const UserSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: [true, 'Email is required!'],
//       trim: true,
//       unique: true,
//       lowercase: true,
//       validate: {
//         validator: function (v) {
//           return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(v);
//         },
//         message: 'Please enter a valid email.',
//       },
//     },
//     password: {
//       type: String,
//       trim: true,
//       required: true,
//       minlength: 8,
//     },
//     phone_number: {
//       type: String,
//       trim: true,
//       required: true,
//       maxlength: 11,
//     },
//     job: {
//       type: String,
//       enum: ['admin', 'customer', 'tourguide'],
//       trim: true,
//       lowercase: true,
//     },
//   },
//   { timestamps: true },
// );
*/
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
