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

  async findByCategoryId(categoryId: number): Promise<ContactTable> {
    const query = `SELECT * FROM contacts WHERE category_id = $1`;
    const result = await this.databaseService.query<ContactTable>(query, [
      categoryId,
    ]);
    return result.rows[0];
  }

  async findBySectionId(sectionId: number): Promise<ContactTable> {
    const query = `SELECT * FROM contacts WHERE section_id = $1`;
    const result = await this.databaseService.query<ContactTable>(query, [
      sectionId,
    ]);
    return result.rows[0];
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

  async updateContactById(input: ContactTable): Promise<ContactTable> {
    const query = `UPDATE contacts SET updated_at = $1, email = $2, email_description = $3, visible_status = $4, section_id = $5 WHERE id = $6 RETURNING *`;
    const result = await this.databaseService.query<ContactTable>(query, [
      new Date(),
      input.email,
      input.email_description,
      input.visible_status,
      input.section_id,
      input.id,
    ]);
    return result.rows[0];
  }
}
