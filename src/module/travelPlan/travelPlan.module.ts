import { Module } from '@nestjs/common';
import { TravelPlanResolver } from './travelPlan.resolver';
import { TravelPlanService } from 'src/service/travelPlan.service';
import { DatabaseService } from 'src/database.service';

@Module({
  providers: [TravelPlanResolver, TravelPlanService, DatabaseService],
})
export class TravelPlanModule {}
