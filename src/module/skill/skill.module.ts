import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillResolver } from './skill.resolver';
import { DatabaseService } from 'src/database.service';

@Module({
  providers: [SkillService, SkillResolver, DatabaseService],
})
export class SkillModule {}
