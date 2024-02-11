import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { ProjectTable } from 'src/dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<ProjectTable[]> {
    const query = `SELECT * FROM projects WHERE visible_status = 'VISIBLE' ORDER BY sort_order`;
    const result = await this.databaseService.query<ProjectTable>(query, []);
    return result.rows;
  }

  async findByCategoryId(sectionId: number): Promise<ProjectTable[]> {
    const query = `SELECT * FROM projects WHERE section_id = $1 AND visible_status = 'VISIBLE' ORDER BY sort_order`;
    const result = await this.databaseService.query<ProjectTable>(query, [
      sectionId,
    ]);
    return result.rows;
  }

  async findByName(name: string): Promise<ProjectTable[]> {
    const query = `SELECT * FROM projects WHERE name = $1 AND visible_status = 'VISIBLE' ORDER BY sort_order`;
    const result = await this.databaseService.query<ProjectTable>(query, [
      name,
    ]);
    return result.rows;
  }

  async findById(id: number): Promise<ProjectTable> {
    const query = `SELECT * FROM projects WHERE id = $1 AND visible_status = 'VISIBLE' ORDER BY sort_order`;
    const result = await this.databaseService.query<ProjectTable>(query, [id]);
    return result.rows[0];
  }

  async findByMainMode(): Promise<ProjectTable> {
    const query = `SELECT * FROM projects WHERE mode = 'MAIN' AND visible_status = 'VISIBLE' ORDER BY sort_order`;
    const result = await this.databaseService.query<ProjectTable>(query, []);
    return result.rows[0];
  }

  async putProjectById(input: ProjectTable): Promise<ProjectTable> {
    const query = `INSERT INTO projects (sort_order, mode, name, content, date_type, end_time, start_date, end_date, visible_status, updated_at, section_id, image_id) VALUES ($2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) ON CONFLICT (id) DO UPDATE SET sort_order = $2, mode = $3, name = $3, content = $4, date_type = $5, end_time = $6, start_date = $7, end_date = $8,  visible_status = $9, updated_at = $10, section_id = $11, image_id = $12 RETURNING *`;

    const result = await this.databaseService.query<ProjectTable>(query, [
      input.id,
      input.sort_order,
      input.mode,
      input.name,
      input.content,
      input.date_type,
      input.end_time,
      input.start_date,
      input.end_date,
      input.visible_status,
      new Date(),
      input.section_id,
      input.image_id,
    ]);

    return result.rows[0];
  }
}
