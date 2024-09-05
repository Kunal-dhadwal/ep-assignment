import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Post } from './post.schema';

@Injectable()
export class PostService {
  constructor(@Inject('PostModel') private postModel: Model<Post>) {}

  async getPostsAggregated() {
    return this.postModel.aggregate([
      {
        $lookup: {
          from: 'users', // Collection name for user
          localField: 'userId',
          foreignField: '_id',
          as: 'user_details',
        },
      },
      { $unwind: '$user_details' },
      {
        $group: {
          _id: '$_id',
          postDetails: { $first: '$$ROOT' },
          userName: { $first: '$user_details.name' },
        },
      },
      {
        $match: { 'postDetails.user_details.age': { $gte: 18 } },
      },
      {
        $project: {
          _id: 0,
          title: '$postDetails.title',
          content: '$postDetails.content',
          userName: 1,
        },
      },
    ]);
  }
}
