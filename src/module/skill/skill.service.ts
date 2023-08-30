import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { SkillTable } from 'src/dto/skill.dto';

@Injectable()
export class SkillService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<SkillTable[]> {
    const query = `SELECT * FROM skills`;
    const result = await this.databaseService.query<SkillTable>(query, []);
    return result.rows;
  }

  async findByCategoryId(categoryId: number): Promise<SkillTable[]> {
    const query = `SELECT * FROM skills WHERE category_id = $1`;
    const result = await this.databaseService.query<SkillTable>(query, [
      categoryId,
    ]);
    return result.rows;
  }

  async findByName(name: string): Promise<SkillTable[]> {
    const query = `SELECT * FROM skills WHERE name = $1`;
    const result = await this.databaseService.query<SkillTable>(query, [name]);
    return result.rows;
  }

  async findById(id: number): Promise<SkillTable> {
    const query = `SELECT * FROM skills WHERE id = $1`;
    const result = await this.databaseService.query<SkillTable>(query, [id]);
    return result.rows[0];
  }
}
