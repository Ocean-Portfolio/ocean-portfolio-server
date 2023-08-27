import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { UserTable } from 'src/dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUser(userId?: string, fields?: string[]): Promise<UserTable[]> {
    const selectedFields = fields ? fields.join(', ') : '*';

    if (userId) {
      const userList = await this.databaseService.query<UserTable>(
        `SELECT ${selectedFields} FROM users WHERE id=$1`,
        [userId],
      );

      return userList.rows;
    } else {
      const userList = await this.databaseService.query<UserTable>(
        `SELECT ${selectedFields} FROM users`,
        [],
      );

      return userList.rows;
    }
  }
}
