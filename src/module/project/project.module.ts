import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { DatabaseService } from 'src/database.service';
import { ProjectController } from './project.controller';

@Module({
  providers: [ProjectService, ProjectResolver, DatabaseService],
  controllers: [ProjectController],
})
export class ProjectModule {}
