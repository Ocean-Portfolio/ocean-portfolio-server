import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { CategoryTable } from 'src/dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<CategoryTable[]> {
    const query = `SELECT * FROM categories`;
    const result = await this.databaseService.query<CategoryTable>(query, []);
    return result.rows;
  }

  async findBySectionId(sectionId: number): Promise<CategoryTable[]> {
    const query = `SELECT * FROM categories WHERE section_id = $1`;
    const result = await this.databaseService.query<CategoryTable>(query, [
      sectionId,
    ]);
    return result.rows;
  }

  async findByName(name: string): Promise<CategoryTable[]> {
    const query = `SELECT * FROM categories WHERE name = $1`;
    const result = await this.databaseService.query<CategoryTable>(query, [
      name,
    ]);
    return result.rows;
  }

  async findById(id: number): Promise<CategoryTable> {
    const query = `SELECT * FROM categories WHERE id = $1`;
    const result = await this.databaseService.query<CategoryTable>(query, [id]);
    return result.rows[0];
  }

  async createCategory(input: CategoryTable): Promise<CategoryTable> {
    const query = `INSERT INTO categories (name, section_id, visible_status) VALUES ($1, $2, $3) RETURNING *`;
    const result = await this.databaseService.query<CategoryTable>(query, [
      new Date(),
      new Date(),
      input.name,
      input.section_id,
      input.visible_status,
    ]);
    return result.rows[0];
  }

  async updateCategoryById(input: CategoryTable): Promise<CategoryTable> {
    const query = `UPDATE categories SET name = $1, section_id = $2, visible_status = $3 WHERE id = $4 RETURNING *`;
    const result = await this.databaseService.query<CategoryTable>(query, [
      new Date(),
      input.name,
      input.section_id,
      input.visible_status,
      input.id,
    ]);
    return result.rows[0];
  }
}
