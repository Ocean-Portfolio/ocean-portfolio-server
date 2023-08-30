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

    const currentDate = format(Date.now(), 'yyyy-MM-dd');
    const filename = `${currentDate}_${file.originalname}`;
    const ifGenerationMatch = await this.getFileMatchedGeneration(filename);

    const options = {
      destination: filename,
      preconditionOpts: { ifGenerationMatch },
    };

    const fileBuffer = Buffer.from(file.buffer);
    await this.bucket.file(filename).save(fileBuffer, options);

    const result = await this.getFileInfo(filename);

    console.log(result);

    return result;
  }

  async getFileInfo(filename: string) {
    const file = this.bucket.file(filename);
    const [metadata] = await file.getMetadata();
    const publicUrl = file.publicUrl();

    return {
      ...metadata,
      publicUrl,
    };
  }

  async getFileMatchedGeneration(filename: string) {
    const preSearchFile = this.bucket.file(filename);
    const isFileExists = await preSearchFile.exists();

    let generationId: string | number = 0;

    if (isFileExists[0]) {
      const [{ generation }] = await preSearchFile.getMetadata();
      generationId = generation;
    }

    return generationId;
  }

  async deleteFile(filename: string) {
    const file = this.bucket.file(filename);
    await file.delete();

    return true;
  }
}
