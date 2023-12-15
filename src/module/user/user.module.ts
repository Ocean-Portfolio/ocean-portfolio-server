import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { DatabaseService } from 'src/database.service';
import { UserService } from 'src/module/user/user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserService, UserResolver, DatabaseService],
  controllers: [UserController],
})
export class UserModule {}
