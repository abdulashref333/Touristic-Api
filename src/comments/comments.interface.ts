import { Document } from 'mongoose';

export default interface IComments extends Document {
    userId: string
    blogId: string
    body: string
    
}

export interface CommentsQuery {

  id: string;
}
