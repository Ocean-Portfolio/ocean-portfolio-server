import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { HistoryTable } from 'src/dto/history.dto';

@Injectable()
export class HistoryService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<HistoryTable[]> {
    const query = `SELECT * FROM histories`;
    const result = await this.databaseService.query<HistoryTable>(query, []);
    return result.rows;
  }

  async findByUserId(userId: number): Promise<HistoryTable[]> {
    const query = `SELECT * FROM histories WHERE user_id = $1`;
    const result = await this.databaseService.query<HistoryTable>(query, [
      userId,
    ]);
    return result.rows;
  }

  async findByTitle(title: string): Promise<HistoryTable[]> {
    const query = `SELECT * FROM histories WHERE title = $1`;
    const result = await this.databaseService.query<HistoryTable>(query, [
      title,
    ]);
    return result.rows;
  }

  async findById(id: number): Promise<HistoryTable> {
    const query = `SELECT * FROM histories WHERE id = $1`;
    const result = await this.databaseService.query<HistoryTable>(query, [id]);
    return result.rows[0];
  }
}
