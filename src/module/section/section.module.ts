import { Module } from '@nestjs/common';
import { SectionService } from 'src/module/section/section.service';
import { SectionResolver } from './section.resolver';
import { DatabaseService } from 'src/database.service';

@Module({
  providers: [SectionService, SectionResolver, DatabaseService],
})
export class SectionModule {}
