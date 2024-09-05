import { Controller, Get, Query } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  async getHierarchy(
    @Query('sortOrder') sortOrder: 'recent' | 'old',
    @Query('parentCategoryId') page: number
  ) {
    return this.categoryService.getHierarchy(sortOrder,page);
  }
}
