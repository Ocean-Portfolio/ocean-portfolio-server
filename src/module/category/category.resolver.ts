import { CategoryTable } from 'src/dto/category.dto';
import { CategoryService } from './category.service';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => CategoryTable)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [CategoryTable])
  async getCategory(): Promise<CategoryTable[]> {
    return await this.categoryService.findAll();
  }

  @Query(() => [CategoryTable])
  async getCategoryBySectionId(
    @Args('section_id') sectionId: number,
  ): Promise<CategoryTable[]> {
    return await this.categoryService.findBySectionId(sectionId);
  }

  @Query(() => [CategoryTable])
  async getCategoryByTitle(
    @Args('name') name: string,
  ): Promise<CategoryTable[]> {
    return await this.categoryService.findByName(name);
  }

  @Query(() => CategoryTable)
  async getCategoryById(@Args('id') id: number): Promise<CategoryTable> {
    return await this.categoryService.findById(id);
  }
}
