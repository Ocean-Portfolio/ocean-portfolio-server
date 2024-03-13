import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryResolver } from './history.resolver';
import { DatabaseService } from 'src/database.service';
import { HistoryController } from './history.controller';

@Module({
  providers: [HistoryService, HistoryResolver, DatabaseService],
  controllers: [HistoryController],
})
export class HistoryModule {}
