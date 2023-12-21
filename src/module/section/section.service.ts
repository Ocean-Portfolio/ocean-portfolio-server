import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { SectionTable } from 'src/dto/section.dto';

@Injectable()
export class SectionService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findByUserId(userId: number): Promise<SectionTable[]> {
    const query = `SELECT * FROM sections WHERE user_id = $1 ORDER BY sort_order`;
    const result = await this.databaseService.query<SectionTable>(query, [
      userId,
    ]);
    return result.rows;
  }

  async findByName(name: string): Promise<SectionTable[]> {
    const query = `SELECT * FROM sections WHERE name = $1`;
    const result = await this.databaseService.query<SectionTable>(query, [
      name,
    ]);
    return result.rows;
  }

  async findById(id: number): Promise<SectionTable> {
    const query = `SELECT * FROM sections WHERE id = $1`;
    const result = await this.databaseService.query<SectionTable>(query, [id]);
    return result.rows[0];
  }
}
