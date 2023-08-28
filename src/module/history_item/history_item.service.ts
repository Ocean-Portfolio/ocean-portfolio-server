import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { HistoryItemTable } from 'src/dto/history_item.dto';

@Injectable()
export class HistoryItemService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<HistoryItemTable[]> {
    const query = `SELECT * FROM history_items`;
    const result = await this.databaseService.query<HistoryItemTable>(
      query,
      [],
    );
    return result.rows;
  }

  async findByHistoryId(historyId: number): Promise<HistoryItemTable[]> {
    const query = `SELECT * FROM history_items WHERE history_id = $1`;
    const result = await this.databaseService.query<HistoryItemTable>(query, [
      historyId,
    ]);
    return result.rows;
  }

  async findByTitle(title: string): Promise<HistoryItemTable[]> {
    const query = `SELECT * FROM history_items WHERE title = $1`;
    const result = await this.databaseService.query<HistoryItemTable>(query, [
      title,
    ]);
    return result.rows;
  }

  async findById(id: number): Promise<HistoryItemTable> {
    const query = `SELECT * FROM history_items WHERE id = $1`;
    const result = await this.databaseService.query<HistoryItemTable>(query, [
      id,
    ]);
    return result.rows[0];
  }
}
