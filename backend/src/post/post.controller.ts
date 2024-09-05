import { Controller, Get } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('aggregated')
  async getAggregatedPosts() {
    return this.postService.getPostsAggregated();
  }
}
