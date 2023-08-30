import { Module } from '@nestjs/common';
import { IntroduceService } from './introduce.service';
import { IntroduceResolver } from './introduce.resolver';
import { DatabaseService } from 'src/database.service';

@Module({
  providers: [IntroduceService, IntroduceResolver, DatabaseService],
})
export class IntroduceModule {}
