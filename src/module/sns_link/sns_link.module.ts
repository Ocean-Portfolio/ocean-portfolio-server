import { Module } from '@nestjs/common';
import { SNSLinkService } from 'src/service/sns_link.service';
import { SNSLinkResolver } from './sns_link.resolver';
import { DatabaseService } from 'src/database.service';

@Module({
  providers: [SNSLinkService, SNSLinkResolver, DatabaseService],
})
export class SNSLinkModule {}
