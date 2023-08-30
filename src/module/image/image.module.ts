import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { DatabaseService } from 'src/database.service';
import { StorageService } from '../storage/storage.service';
import { ImageResolver } from './image.resolver';

@Module({
  providers: [ImageService, StorageService, ImageResolver, DatabaseService],
  controllers: [ImageController],
})
export class ImageModule {}
