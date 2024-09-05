import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { postProviders } from './post.providers';
import { PostSchema } from './post.schema';
// import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }])],
  controllers: [PostController],
  providers: [PostService, ...postProviders],
})
export class PostModule {}
