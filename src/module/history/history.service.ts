import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { HistoryTable } from 'src/dto/history.dto';

@Injectable()
export class HistoryService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<HistoryTable[]> {
    const query = `SELECT * FROM histories WHERE visible_status = 'VISIBLE' ORDER BY sort_order`;
    const result = await this.databaseService.query<HistoryTable>(query, []);
    return result.rows;
  }

  async findByCategoryId(categoryId: number): Promise<HistoryTable[]> {
    const query = `SELECT * FROM histories WHERE category_id = $1 AND visible_status = 'VISIBLE' ORDER BY sort_order`;
    const result = await this.databaseService.query<HistoryTable>(query, [
      categoryId,
    ]);
    return result.rows;
  }

  async findByTitle(title: string): Promise<HistoryTable[]> {
    const query = `SELECT * FROM histories WHERE title = $1 AND visible_status = 'VISIBLE' ORDER BY sort_order`;
    const result = await this.databaseService.query<HistoryTable>(query, [
      title,
    ]);
    return result.rows;
  }

  async findById(id: number): Promise<HistoryTable> {
    const query = `SELECT * FROM histories WHERE id = $1 AND visible_status = 'VISIBLE'`;
    const result = await this.databaseService.query<HistoryTable>(query, [id]);
    return result.rows[0];
  }

  async putHistoryById(input: HistoryTable): Promise<HistoryTable> {
    const query = `INSERT INTO histories (id, sort_order, title, date_type, end_time, start_date, end_date, visible_status, updated_at, category_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
    ON CONFLICT (id) 
    DO UPDATE SET
        sort_order = EXCLUDED.sort_order,
        title = EXCLUDED.title,
        date_type = EXCLUDED.date_type, 
        end_time = EXCLUDED.end_time, 
        start_date = EXCLUDED.start_date, 
        end_date = EXCLUDED.end_date, 
        visible_status = EXCLUDED.visible_status,
        updated_at = EXCLUDED.updated_at, 
        category_id = EXCLUDED.category_id
    RETURNING *;
    `;

    const result = await this.databaseService.query<HistoryTable>(query, [
      input.id,
      input.sort_order,
      input.title,
      input.date_type,
      input.end_time,
      input.start_date,
      input.end_date,
      input.visible_status,
      new Date(),
      input.category_id,
    ]);
    return result.rows[0];
  }
}
