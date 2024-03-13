import { Body, Controller, Put } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryTable } from 'src/dto/history.dto';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Put()
  async putHistoryById(@Body() input: HistoryTable): Promise<HistoryTable> {
    return await this.historyService.putHistoryById(input);
  }
}
