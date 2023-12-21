import { Module } from '@nestjs/common';
import { SectionService } from 'src/module/section/section.service';
import { SectionResolver } from './section.resolver';
import { DatabaseService } from 'src/database.service';
import { SectionController } from './section.controller';

@Module({
  providers: [SectionService, SectionResolver, DatabaseService],
  controllers: [SectionController],
})
export class SectionModule {}
