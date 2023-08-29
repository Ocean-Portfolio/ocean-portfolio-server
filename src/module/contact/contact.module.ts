import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { DatabaseService } from 'src/database.service';
import { ContactResolver } from './contact.resolver';

@Module({
  providers: [ContactService, ContactResolver, DatabaseService],
})
export class ContactModule {}
