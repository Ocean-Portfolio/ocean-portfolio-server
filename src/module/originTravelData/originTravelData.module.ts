import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FourSquareDataService } from 'src/service/foursquareData.service';
import { OriginTravelDataResolver } from './originTravelData.resolver';
import { OriginTravelDataController } from './originTravelData.controller';

@Module({
  imports: [HttpModule],
  controllers: [OriginTravelDataController],
  providers: [OriginTravelDataResolver, FourSquareDataService],
})
export class OriginTravelData {}
