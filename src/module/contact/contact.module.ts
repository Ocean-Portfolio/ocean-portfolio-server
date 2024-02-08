import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { DatabaseService } from 'src/database.service';
import { ContactResolver } from './contact.resolver';
import { ContactController } from './contact.controller';

@Module({
  providers: [ContactService, ContactResolver, DatabaseService],
  controllers: [ContactController],
})
export class ContactModule {}
