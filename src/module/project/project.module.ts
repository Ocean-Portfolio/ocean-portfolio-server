import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { DatabaseService } from 'src/database.service';

@Module({
  providers: [ProjectService, ProjectResolver, DatabaseService],
})
export class ProjectModule {}
