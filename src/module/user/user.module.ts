import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { DatabaseService } from 'src/database.service';
import { UserService } from 'src/service/user.service';

@Module({
  providers: [UserService, UserResolver, DatabaseService],
})
export class UserModule {}
