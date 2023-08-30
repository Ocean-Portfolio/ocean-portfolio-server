import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { StorageService } from '../storage/storage.service';
import { ImageTable } from 'src/dto/image.dto';

@Injectable()
export class ImageService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly storageService: StorageService,
  ) {}

  async findAll(): Promise<ImageTable[]> {
    const query = `SELECT * FROM images`;
    const result = await this.databaseService.query<ImageTable>(query, []);
    return result.rows;
  }

  async findByName(name: string): Promise<ImageTable[]> {
    const query = `SELECT * FROM images WHERE name = $1`;
    const result = await this.databaseService.query<ImageTable>(query, [name]);
    return result.rows;
  }

  async findById(id: number): Promise<ImageTable> {
    const query = `SELECT * FROM images WHERE id = $1`;
    const result = await this.databaseService.query<ImageTable>(query, [id]);
    return result.rows[0];
  }

  async putImage(image: Express.Multer.File, description?: string) {
    try {
      if (!image.mimetype.includes(image.mimetype)) {
        throw new Error('이미지 파일만 업로드 가능합니다.');
      }

      const { name, publicUrl, generation, timeCreated, updated } =
        await this.storageService.uploadFile(image);

      const query = `
      INSERT INTO images (name, storage_url, generation_id, description, visible_status, created_at, updated_at)  
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
      `;

      const result = await this.databaseService.query(query, [
        name,
        publicUrl,
        generation,
        description || '',
        'VISIBLE',
        timeCreated,
        updated,
      ]);

      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteImage(id: number) {
    const imageRow = await this.findById(id);

    this.storageService.deleteFile(imageRow.name);

    const query = `DELETE FROM images WHERE id = $1 RETURNING *`;
    const result = await this.databaseService.query<ImageTable>(query, [id]);

    return result.rows[0];
  }
}
