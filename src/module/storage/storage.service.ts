import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';

@Injectable()
export class StorageService {
  private client: S3Client;
  private bucket = process.env.R2_BUCKET_NAME;

  constructor() {
    this.client = new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.S3_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });
  }

  // directory 는 항상 ***/ 형태로 넣어야함
  async uploadFile(file: Express.Multer.File, directory?: string) {
    const currentDate = format(Date.now(), 'yyyy-MM-dd');
    const filename = `${currentDate}_${file.originalname}`;
    const Key = `${directory || ''}${filename}`;

    const data = await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: Key,
        Body: file.buffer,
      }),
    );
    return {
      ...data,
      name: filename,
      publicUrl: `https://${process.env.R2_PUBLIC_HOST}/${Key}`,
      currentDate,
    };
  }

  async deleteFile(filename: string) {
    const data = await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: filename,
      }),
    );

    return data;
  }
}
