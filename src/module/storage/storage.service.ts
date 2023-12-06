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

  async uploadFile(file: Express.Multer.File) {
    const currentDate = format(Date.now(), 'yyyy-MM-dd');
    const filename = `${currentDate}_${file.originalname}`;
    const data = await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: filename,
        Body: file.buffer,
      }),
    );
    return data;
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
