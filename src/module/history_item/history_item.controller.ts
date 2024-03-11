import { Body, Controller, Put } from '@nestjs/common';
import { HistoryItemService } from './history_item.service';
import { HistoryItemTable } from 'src/dto/history_item.dto';

@Controller('history_item')
export class HistoryItemController {
  constructor(private readonly historyItemService: HistoryItemService) {}

  @Put()
  async putHistoryItemById(
    @Body() input: HistoryItemTable,
  ): Promise<HistoryItemTable> {
    return await this.historyItemService.putHistoryItemById(input);
  }
}
