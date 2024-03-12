import { Body, Controller, Put } from '@nestjs/common';
import { HistoryImpactService } from './history_impact.service';
import { HistoryImpactTable } from 'src/dto/history_impact.dto';

@Controller('history_impact')
export class HistoryImpactController {
  constructor(private readonly historyImpactService: HistoryImpactService) {}

  @Put()
  async putHistoryImpactById(
    @Body() input: HistoryImpactTable,
  ): Promise<HistoryImpactTable> {
    return await this.historyImpactService.putHistoryImpactById(input);
  }
}
