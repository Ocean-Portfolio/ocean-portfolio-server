import { Args, Query, Resolver } from '@nestjs/graphql';
import { HistoryTable } from 'src/dto/history.dto';
import { HistoryService } from './history.service';

@Resolver(() => HistoryTable)
export class HistoryResolver {
  constructor(private readonly historyService: HistoryService) {}

  @Query(() => [HistoryTable])
  async getHistories(): Promise<HistoryTable[]> {
    return await this.historyService.findAll();
  }

  @Query(() => [HistoryTable])
  async getHistoriesByUserId(
    @Args('user_id') userId: number,
  ): Promise<HistoryTable[]> {
    return await this.historyService.findByUserId(userId);
  }

  @Query(() => [HistoryTable])
  async getHistoriesByTitle(
    @Args('title') title: string,
  ): Promise<HistoryTable[]> {
    return await this.historyService.findByTitle(title);
  }

  @Query(() => HistoryTable)
  async getHistoryById(@Args('id') id: number): Promise<HistoryTable> {
    return await this.historyService.findById(id);
  }
}
