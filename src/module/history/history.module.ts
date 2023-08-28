import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryResolver } from './history.resolver';
import { DatabaseService } from 'src/database.service';

@Module({
  providers: [HistoryService, HistoryResolver, DatabaseService],
})
export class HistoryModule {}
