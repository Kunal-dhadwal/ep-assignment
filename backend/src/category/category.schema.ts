import { Schema, Document } from 'mongoose';

export interface Category extends Document {
    name: string;
    parentCategory?: Category;
    createdAt?:Date;
}

export const CategorySchema = new Schema({
    name: { type: String, required: true },
    parentCategory: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
}, { timestamps: true }); 