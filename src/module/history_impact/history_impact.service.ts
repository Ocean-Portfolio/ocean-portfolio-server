import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { HistoryImpactTable } from 'src/dto/history_impact.dto';

@Injectable()
export class HistoryImpactService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<HistoryImpactTable[]> {
    const query = `SELECT * FROM history_impacts WHERE visible_status = 'VISIBLE' ORDER BY sort_order`;
    const result = await this.databaseService.query<HistoryImpactTable>(
      query,
      [],
    );
    return result.rows;
  }

  async findByHistoryItemId(
    historyItemId: number,
  ): Promise<HistoryImpactTable[]> {
    const query = `SELECT * FROM history_impacts WHERE history_item_id = $1 AND visible_status = 'VISIBLE' ORDER BY sort_order`;
    const result = await this.databaseService.query<HistoryImpactTable>(query, [
      historyItemId,
    ]);
    return result.rows;
  }

  async findById(id: number): Promise<HistoryImpactTable> {
    const query = `SELECT * FROM history_impacts WHERE id = $1 AND visible_status = 'VISIBLE'`;
    const result = await this.databaseService.query<HistoryImpactTable>(query, [
      id,
    ]);
    return result.rows[0];
  }

  async putHistoryImpactById(
    input: HistoryImpactTable,
  ): Promise<HistoryImpactTable> {
    const query = `INSERT INTO history_impacts (id, sort_order, before, after, content, visible_status, updated_at, history_item_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
    ON CONFLICT (id) 
    DO UPDATE SET 
        sort_order = EXCLUDED.sort_order, 
        before = EXCLUDED.before, 
        after = EXCLUDED.after, 
        content = EXCLUDED.content, 
        visible_status = EXCLUDED.visible_status, 
        updated_at = EXCLUDED.updated_at, 
        history_item_id = EXCLUDED.history_item_id
    RETURNING *;
    `;

    const result = await this.databaseService.query<HistoryImpactTable>(query, [
      input.id,
      input.sort_order,
      input.before,
      input.after,
      input.content,
      input.visible_status,
      new Date(),
      input.history_item_id,
    ]);

    return result.rows[0];
  }
}
