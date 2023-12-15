import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { CreateSNSLink, SNSLinkTable } from 'src/dto/sns_link.dto';

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

  async createSNSLink(input: CreateSNSLink): Promise<SNSLinkTable> {
    const query = `INSERT INTO sns_links (type, link, user_id) VALUES ($1, $2, $3) RETURNING *`;
    const result = await this.databaseService.query<SNSLinkTable>(query, [
      input.type,
      input.link,
      input.user_id,
    ]);
    return result.rows[0];
  }

  async updateSNSLinkById(input: SNSLinkTable): Promise<SNSLinkTable> {
    const query = `UPDATE sns_links SET type = $1, link = $2, visible_status = $3, updated_at = $4 WHERE id = $5 RETURNING *`;
    const result = await this.databaseService.query<SNSLinkTable>(query, [
      input.type,
      input.link,
      input.visible_status,
      new Date(),
      input.id,
    ]);
    return result.rows[0];
  }
}
