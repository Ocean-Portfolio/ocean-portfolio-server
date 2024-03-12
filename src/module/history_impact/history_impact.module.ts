import { Module } from '@nestjs/common';
import { HistoryImpactService } from './history_impact.service';
import { DatabaseService } from 'src/database.service';
import { HistoryImpactController } from './history_impact.controller';
import { HistoryImpactResolver } from './history_impact.resolver';

@Module({
  providers: [HistoryImpactService, HistoryImpactResolver, DatabaseService],
  controllers: [HistoryImpactController],
})
export class HistoryImpactModule {}
