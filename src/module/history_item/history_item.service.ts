import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { HistoryImpactTable } from 'src/dto/history_impact.dto';
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
    const historyItemQuery = `SELECT * FROM history_items WHERE history_id = $1`;

    const historyItemResult =
      await this.databaseService.query<HistoryItemTable>(historyItemQuery, [
        historyId,
      ]);

    const historyImpactQuery = `SELECT * FROM history_impacts WHERE history_item_id = $1`;

    await Promise.all(
      historyItemResult.rows.map(async (historyItem, idx) => {
        const result = await this.databaseService.query<HistoryImpactTable>(
          historyImpactQuery,
          [historyItem.id],
        );
        historyItemResult.rows[idx].impacts = result.rows;
        return historyItem;
      }),
    );

    return historyItemResult.rows;
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

  async putHistoryItemById(input: HistoryItemTable): Promise<HistoryItemTable> {
    const query = `INSERT INTO history_items (id, sort_order, title, position, content, date_type, start_date, end_date, visible_status, updated_at, history_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
    ON CONFLICT (id) 
    DO UPDATE SET 
        sort_order = EXCLUDED.sort_order, 
        title = EXCLUDED.title, 
        position = EXCLUDED.position, 
        content = EXCLUDED.content, 
        date_type = EXCLUDED.date_type, 
        start_date = EXCLUDED.start_date, 
        end_date = EXCLUDED.end_date, 
        visible_status = EXCLUDED.visible_status, 
        updated_at = EXCLUDED.updated_at, 
        history_id = EXCLUDED.history_id
    RETURNING *;
    `;
    // const query = ``;

    const result = await this.databaseService.query<HistoryItemTable>(query, [
      input.id,
      input.sort_order,
      input.title,
      input.position,
      input.content,
      input.date_type,
      input.start_date,
      input.end_date,
      input.visible_status,
      new Date(),
      input.history_id,
    ]);

    return result.rows[0];
  }
}
