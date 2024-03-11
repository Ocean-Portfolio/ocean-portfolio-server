import { Module } from '@nestjs/common';
import { HistoryItemService } from './history_item.service';
import { HistoryItemResolver } from './history_item.resolver';
import { DatabaseService } from 'src/database.service';
import { HistoryItemController } from './history_item.controller';

@Module({
  providers: [HistoryItemService, HistoryItemResolver, DatabaseService],
  controllers: [HistoryItemController],
})
export class HistoryItemModule {}
