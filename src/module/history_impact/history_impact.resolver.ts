import { Args, Query, Resolver } from '@nestjs/graphql';
import { HistoryImpactTable } from 'src/dto/history_impact.dto';
import { HistoryImpactService } from './history_impact.service';

@Resolver(() => HistoryImpactTable)
export class HistoryImpactResolver {
  constructor(private readonly historyImpactService: HistoryImpactService) {}

  @Query(() => [HistoryImpactTable])
  async getHistoryImpact(): Promise<HistoryImpactTable[]> {
    return await this.historyImpactService.findAll();
  }

  @Query(() => [HistoryImpactTable])
  async getHistoryImpactByHistoryItemId(
    @Args('history_item_id') history_item_id: number,
  ): Promise<HistoryImpactTable[]> {
    return await this.historyImpactService.findByHistoryItemId(history_item_id);
  }

  @Query(() => HistoryImpactTable)
  async getHistoryImpactById(
    @Args('id') id: number,
  ): Promise<HistoryImpactTable> {
    return await this.historyImpactService.findById(id);
  }
}
