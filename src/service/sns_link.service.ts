import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { SNSLinkTable } from 'src/dto/sns_link.dto';

@Injectable()
export class SNSLinkService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findByUserId(userId: number): Promise<SNSLinkTable[]> {
    const query = `SELECT * FROM sns_links WHERE user_id = $1`;
    const result = await this.databaseService.query<SNSLinkTable>(query, [
      userId,
    ]);
    return result.rows;
  }

  async findByType(type: string): Promise<SNSLinkTable[]> {
    const query = `SELECT * FROM sns_links WHERE type = $1`;
    const result = await this.databaseService.query<SNSLinkTable>(query, [
      type,
    ]);
    return result.rows;
  }

  async findById(id: number): Promise<SNSLinkTable> {
    const query = `SELECT * FROM sns_links WHERE id = $1`;
    const result = await this.databaseService.query<SNSLinkTable>(query, [id]);
    return result.rows[0];
  }
}
