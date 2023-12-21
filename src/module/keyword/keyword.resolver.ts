import { Args, Query, Resolver } from '@nestjs/graphql';
import { KeywordTable } from 'src/dto/keyword.dto';
import { KeywordService } from './keyword.service';

@Resolver(() => KeywordTable)
export class KeywordResolver {
  constructor(private readonly historyService: KeywordService) {}

  @Query(() => [KeywordTable])
  async getKeywords(): Promise<KeywordTable[]> {
    return await this.historyService.findAll();
  }

  @Query(() => KeywordTable)
  async getKeywordsByCategoryId(
    @Args('category_id') categoryId: number,
  ): Promise<KeywordTable> {
    return await this.historyService.findByCategoryId(categoryId);
  }

  @Query(() => [KeywordTable])
  async getKeywordsByTitle(
    @Args('title') title: string,
  ): Promise<KeywordTable[]> {
    return await this.historyService.findByTitle(title);
  }

  @Query(() => KeywordTable)
  async getKeywordById(@Args('id') id: number): Promise<KeywordTable> {
    return await this.historyService.findById(id);
  }
}
