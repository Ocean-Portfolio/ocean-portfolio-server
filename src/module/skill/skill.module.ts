import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillResolver } from './skill.resolver';
import { DatabaseService } from 'src/database.service';
import { ImageService } from '../image/image.service';
import { SkillController } from './skill.controller';
import { StorageService } from '../storage/storage.service';

@Module({
  providers: [
    SkillService,
    SkillResolver,
    DatabaseService,
    ImageService,
    StorageService,
  ],
  controllers: [SkillController],
})
export class SkillModule {}
