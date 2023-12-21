import { Module } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { KeywordResolver } from './keyword.resolver';
import { DatabaseService } from 'src/database.service';
import { KeywordController } from './keyword.controller';

@Module({
  providers: [KeywordService, KeywordResolver, DatabaseService],
  controllers: [KeywordController],
})
export class KeywordModule {}
