import { Module } from '@nestjs/common';
import { CollabService } from './collab.service';
import { DatabaseService } from 'src/database.service';
import { CollabResolver } from './collab.resolver';

@Module({
  providers: [CollabService, CollabResolver, DatabaseService],
})
export class CollabModule {}
