import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { IntroduceTable } from 'src/dto/introduce.dto';

@Injectable()
export class IntroduceService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<IntroduceTable[]> {
    const query = `SELECT * FROM introduces`;
    const result = await this.databaseService.query<IntroduceTable>(query, []);
    return result.rows;
  }

  async findBySectionId(sectionId: number): Promise<IntroduceTable> {
    const query = `SELECT * FROM introduces WHERE section_id = $1`;
    const result = await this.databaseService.query<IntroduceTable>(query, [
      sectionId,
    ]);
    return result.rows[0];
  }

  async findById(id: number): Promise<IntroduceTable> {
    const query = `SELECT * FROM introduces WHERE id = $1`;
    const result = await this.databaseService.query<IntroduceTable>(query, [
      id,
    ]);
    return result.rows[0];
  }
}
