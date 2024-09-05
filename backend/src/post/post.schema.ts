import { Schema, Document } from 'mongoose';

export interface Post extends Document {
  title: string;
  content: string;
  userId: string;
}

export const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});
