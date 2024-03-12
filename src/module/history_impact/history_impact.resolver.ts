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
  async getHistoryImpactByHistoryId(
    @Args('history_id') historyId: number,
  ): Promise<HistoryImpactTable[]> {
    return await this.historyImpactService.findByHistoryItemId(historyId);
  }

  @Query(() => HistoryImpactTable)
  async getHistoryImpactById(
    @Args('id') id: number,
  ): Promise<HistoryImpactTable> {
    return await this.historyImpactService.findById(id);
  }
}
