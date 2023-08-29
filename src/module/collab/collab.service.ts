import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { CollabTable } from 'src/dto/collab.dto';

@Injectable()
export class CollabService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<CollabTable[]> {
    const query = `SELECT * FROM collab`;
    const result = await this.databaseService.query<CollabTable>(query, []);
    return result.rows;
  }
}
