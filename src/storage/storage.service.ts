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
    const filename = `${currentDate}-${file.originalname}`;
    const preSearchFile = this.bucket.file(filename);
    const isFileExists = await preSearchFile.exists();
    let ifGenerationMatch: string | number = 0;

    if (isFileExists[0]) {
      const [{ generation }] = await preSearchFile.getMetadata();
      ifGenerationMatch = generation;
    }

    const options = {
      destination: filename,
      preconditionOpts: { ifGenerationMatch },
    };

    const fileBuffer = Buffer.from(file.buffer);
    await this.bucket.file(filename).save(fileBuffer, options);

    const uploadedFile = this.bucket.file(filename);
    const [metadata] = await uploadedFile.getMetadata();
    const publicUrl = uploadedFile.publicUrl();

    const result = {
      ...metadata,
      publicUrl,
    };

    console.log(result);

    return result;
  }
}
