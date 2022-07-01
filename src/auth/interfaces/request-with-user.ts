import { Request } from 'express';
import IUser from 'src/user/user.interface';

export default interface RequestWithUser {
  user: IUser;
  req: Request;
}
