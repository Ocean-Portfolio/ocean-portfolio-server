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

  async findByCategoryId(categoryId: number): Promise<KeywordTable[]> {
    const query = `SELECT * FROM keywords WHERE category_id = $1`;
    const result = await this.databaseService.query<KeywordTable>(query, [
      categoryId,
    ]);
    return result.rows;
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
}
