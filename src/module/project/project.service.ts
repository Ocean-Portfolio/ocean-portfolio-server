import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { ProjectTable } from 'src/dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<ProjectTable[]> {
    const query = `SELECT * FROM projects`;
    const result = await this.databaseService.query<ProjectTable>(query, []);
    return result.rows;
  }

  async findByCategoryId(sectionId: number): Promise<ProjectTable[]> {
    const query = `SELECT * FROM projects WHERE section_id = $1`;
    const result = await this.databaseService.query<ProjectTable>(query, [
      sectionId,
    ]);
    return result.rows;
  }

  async findByName(name: string): Promise<ProjectTable[]> {
    const query = `SELECT * FROM projects WHERE name = $1`;
    const result = await this.databaseService.query<ProjectTable>(query, [
      name,
    ]);
    return result.rows;
  }

  async findById(id: number): Promise<ProjectTable> {
    const query = `SELECT * FROM projects WHERE id = $1`;
    const result = await this.databaseService.query<ProjectTable>(query, [id]);
    return result.rows[0];
  }

  async findByMainMode(): Promise<ProjectTable> {
    const query = `SELECT * FROM projects WHERE mode = 'MAIN'`;
    const result = await this.databaseService.query<ProjectTable>(query, []);
    return result.rows[0];
  }
}
