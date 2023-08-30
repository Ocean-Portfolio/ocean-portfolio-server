import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { ContactTable } from 'src/dto/contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<ContactTable[]> {
    const query = `SELECT * FROM contacts`;
    const result = await this.databaseService.query<ContactTable>(query, []);
    return result.rows;
  }

  async findBySectionId(sectionId: number): Promise<ContactTable[]> {
    const query = `SELECT * FROM contacts WHERE section_id = $1`;
    const result = await this.databaseService.query<ContactTable>(query, [
      sectionId,
    ]);
    return result.rows;
  }

  async findByEmail(email: string): Promise<ContactTable[]> {
    const query = `SELECT * FROM contacts WHERE email = $1`;
    const result = await this.databaseService.query<ContactTable>(query, [
      email,
    ]);
    return result.rows;
  }

  async findById(id: number): Promise<ContactTable> {
    const query = `SELECT * FROM contacts WHERE id = $1`;
    const result = await this.databaseService.query<ContactTable>(query, [id]);
    return result.rows[0];
  }
}
