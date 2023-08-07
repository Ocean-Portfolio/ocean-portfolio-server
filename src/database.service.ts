// database.service.ts
import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
  private readonly client: Pool;

  constructor() {
    this.client = new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
    });
  }

  query<T>(text: string, params: any[]) {
    return this.client.query<T>(text, params);
  }
}
