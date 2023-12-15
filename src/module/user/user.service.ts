import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { UserTable } from 'src/dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUserById(userId?: string, fields?: string[]): Promise<UserTable[]> {
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

  async getUsers(): Promise<UserTable[]> {
    const userList = await this.databaseService.query<UserTable>(
      `SELECT * FROM users`,
      [],
    );

    return userList.rows;
  }

  async updateUserById(input: UserTable): Promise<UserTable> {
    const query = `UPDATE users SET name = $1, password = $2, email = $3, job = $4, image_id = $5, updated_at = $6 WHERE id = $7 RETURNING *`;
    const result = await this.databaseService.query<UserTable>(query, [
      input.name,
      input.password,
      input.email,
      input.job,
      input.image_id,
      new Date(),
      input.id,
    ]);
    return result.rows[0];
  }
}
