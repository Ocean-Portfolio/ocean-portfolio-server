import {
  Body,
  Controller,
  Delete,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Put()
  @UseInterceptors(FileInterceptor('file'))
  async putImage(
    @UploadedFile() file: Express.Multer.File,
    @Body()
    body: {
      directory?: string;
      description?: string;
    },
  ) {
    const result = await this.imageService.putImage(
      file,
      body.directory,
      body.description,
    );
    return result;
  }

  @Delete()
  async deleteImage(@Body() body: { id: number }) {
    const result = await this.imageService.deleteImage(body.id);
    return result;
  }
}
