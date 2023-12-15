import { Module } from '@nestjs/common';
import { SNSLinkService } from 'src/module/sns_link/sns_link.service';
import { SNSLinkResolver } from './sns_link.resolver';
import { DatabaseService } from 'src/database.service';
import { SNSLinkController } from './sns_link.controller';

@Module({
  providers: [SNSLinkService, SNSLinkResolver, DatabaseService],
  controllers: [SNSLinkController],
})
export class SNSLinkModule {}
