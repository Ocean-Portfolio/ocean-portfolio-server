// files.controller.ts

import {
  Controller,
  Get,
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
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const publicUrl = await this.storageService.uploadFile(file);
    return publicUrl;
  }

  @Get()
  async getFileInfo(filename: string) {
    const result = await this.storageService.getFileInfo(filename);
    return result;
  }
}
