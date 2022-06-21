import { Document } from 'mongoose';

export default interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  nationality: string;
  gender: string;
}

export interface UserQuery {
  email: string;
  id: string;
}
