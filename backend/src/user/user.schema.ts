import { Schema, Document } from 'mongoose';

export interface User extends Document {
  name: string;
  age: number;
  active: boolean;
}

export const UserSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  active: { type: Boolean, default: false },
});
