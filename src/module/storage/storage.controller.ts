import {
  Body,
  Controller,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Put()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body()
    body: {
      directory?: string;
    },
  ) {
    const publicUrl = await this.storageService.uploadFile(
      file,
      body.directory,
    );
    return publicUrl;
  }
}
