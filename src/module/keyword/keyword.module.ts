import { Module } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { KeywordResolver } from './keyword.resolver';
import { DatabaseService } from 'src/database.service';

@Module({
  providers: [KeywordService, KeywordResolver, DatabaseService],
})
export class KeywordModule {}
