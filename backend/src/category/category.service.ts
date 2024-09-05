import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.schema';

@Injectable()
export class CategoryService {
  constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) { }

  async getHierarchy(sortOrder: 'recent' | 'old' = 'recent', page: number) {
    const sortOption = sortOrder === 'recent' ? { createdAt: -1 } : { createdAt: 1 };
    let limit = 10;
    let skip = (page - 1) * limit;
    let data = await this.categoryModel.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: 'parentCategory',
          as: 'children',
          pipeline: [
            {
              $lookup: {
                from: 'categories',
                localField: '_id',
                foreignField: 'parentCategory',
                as: 'children',
              }
            },
          ]
        },
      },
      {
        $match: { parentCategory: null },
      },
        // {
        //   $sort: sortOption,
        // },
      {
        $skip: skip
      },
      {
        $limit: limit
      },
      {
        $project: {
          _id: 1,
          name: 1,
          createdAt: 1,
          children: 1
        },
      },
    ]);
    let length = await this.categoryModel.countDocuments({});
    return {
      data,
      length
    }
  }


}
