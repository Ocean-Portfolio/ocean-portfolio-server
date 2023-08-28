import { Module } from '@nestjs/common';
import { HistoryItemService } from './history_item.service';
import { HistoryItemResolver } from './history_item.resolver';
import { DatabaseService } from 'src/database.service';

@Module({
  providers: [HistoryItemService, HistoryItemResolver, DatabaseService],
})
export class HistoryItemModule {}
