import { Args, Query, Resolver } from '@nestjs/graphql';
import { HistoryItemTable } from 'src/dto/history_item.dto';
import { HistoryItemService } from './history_item.service';

@Resolver(() => HistoryItemTable)
export class HistoryItemResolver {
  constructor(private readonly historyService: HistoryItemService) {}

  @Query(() => [HistoryItemTable])
  async getHistoryItem(): Promise<HistoryItemTable[]> {
    return await this.historyService.findAll();
  }

  @Query(() => [HistoryItemTable])
  async getHistoryItemByCategoryId(
    @Args('history_id') historyId: number,
  ): Promise<HistoryItemTable[]> {
    return await this.historyService.findByHistoryId(historyId);
  }

  @Query(() => [HistoryItemTable])
  async getHistoryItemByTitle(
    @Args('title') title: string,
  ): Promise<HistoryItemTable[]> {
    return await this.historyService.findByTitle(title);
  }

  @Query(() => HistoryItemTable)
  async getHistoryItemById(@Args('id') id: number): Promise<HistoryItemTable> {
    return await this.historyService.findById(id);
  }
}
