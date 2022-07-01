import { Document } from 'mongoose';

export default interface IBlogs extends Document {
  userId: [{}];
  title: Text;
  subtitle: Text;
  photo: Blob;
  body: Text;
  tags: [string];
  date: Date;
  approved: boolean;
}

export interface BlogsQuery {
  id: string;
}
