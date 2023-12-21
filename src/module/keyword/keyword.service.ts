import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { KeywordTable } from 'src/dto/keyword.dto';

@Injectable()
export class KeywordService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<KeywordTable[]> {
    const query = `SELECT * FROM keywords`;
    const result = await this.databaseService.query<KeywordTable>(query, []);
    return result.rows;
  }

  async findByCategoryId(categoryId: number): Promise<KeywordTable> {
    const query = `SELECT * FROM keywords WHERE category_id = $1`;
    const result = await this.databaseService.query<KeywordTable>(query, [
      categoryId,
    ]);
    return result.rows[0];
  }

  async findByTitle(title: string): Promise<KeywordTable[]> {
    const query = `SELECT * FROM keywords WHERE title = $1`;
    const result = await this.databaseService.query<KeywordTable>(query, [
      title,
    ]);
    return result.rows;
  }

  async findById(id: number): Promise<KeywordTable> {
    const query = `SELECT * FROM keywords WHERE id = $1`;
    const result = await this.databaseService.query<KeywordTable>(query, [id]);
    return result.rows[0];
  }

  async updateKeywordById(input: KeywordTable): Promise<KeywordTable> {
    const query = `UPDATE keywords SET updated_at = $1, main_text = $2, description = $3, visible_status = $4, category_id = $5 WHERE id = $6 RETURNING *`;
    const result = await this.databaseService.query<KeywordTable>(query, [
      new Date(),
      input.main_text,
      input.description,
      input.visible_status,
      input.category_id,
      input.id,
    ]);
    return result.rows[0];
  }
}
