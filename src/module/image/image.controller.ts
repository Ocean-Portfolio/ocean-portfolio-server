import { Controller, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Put()
  @UseInterceptors(FileInterceptor('file'))
  async putImage(
    @UploadedFile() file: Express.Multer.File,
    description?: string,
  ) {
    const result = await this.imageService.putImage(file, description);
    return result;
  }
}
