import { Bucket, Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';

@Injectable()
export class StorageService {
  private storage: Storage;
  private bucket: Bucket;

  constructor() {
    this.storage = new Storage({
      projectId: process.env.STORAGE_PROJECT_ID,
      keyFilename: process.env.STORAGE_KEY_FILENAME,
    });

    this.bucket = this.storage.bucket(process.env.STORAGE_PROJECT_ID);
  }

  async uploadFile(file: Express.Multer.File) {
    console.log(file);
    const filename = `${format(Date.now(), 'yyyy-MM-dd')}-${file.originalname}`;
    const options = {
      destination: filename,
      preconditionOpts: { ifGenerationMatch: 0 },
    };

    const fileBuffer = Buffer.from(file.buffer);

    await this.bucket.file(filename).save(fileBuffer, options);

    const publicUrl = `https://storage.googleapis.com/${this.bucket.name}/${filename}`;

    return publicUrl;
  }
}
