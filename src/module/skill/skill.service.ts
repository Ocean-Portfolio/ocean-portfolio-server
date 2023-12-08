import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { SkillTable } from 'src/dto/skill.dto';
import { ImageService } from '../image/image.service';

@Injectable()
export class SkillService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly imageService: ImageService,
  ) {}

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

  async createSkillItem({
    file,
    image,
    name,
    description,
    categoryId,
  }: {
    file: Express.Multer.File;
    image?: { directory?: string; description?: string };
    name: string;
    description: string;
    categoryId: number;
  }) {
    const selectQuery = `SELECT * FROM skills WHERE name = $1`;

    const selectResult = await this.databaseService.query<SkillTable>(
      selectQuery,
      [name],
    );

    const imageServiceResult = await this.imageService.putImage(
      file,
      image?.directory,
      image?.description,
    );

    const originSkillCreatedAt = selectResult.rows[0]?.created_at;
    const imageId = imageServiceResult.id;

    const query = `
      INSERT INTO skills (name, description, category_id, image_id, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
      `;

    const result = await this.databaseService.query<SkillTable>(query, [
      name,
      description,
      categoryId,
      imageId,
      originSkillCreatedAt || new Date(),
      new Date(),
    ]);

    return result.rows[0];
  }
}
