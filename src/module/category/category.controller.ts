import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryTable } from 'src/dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() input: CategoryTable): Promise<CategoryTable> {
    return await this.categoryService.createCategory(input);
  }

  @Patch()
  async updateCategoryById(
    @Body() input: CategoryTable,
  ): Promise<CategoryTable> {
    return await this.categoryService.updateCategoryById(input);
  }
}
