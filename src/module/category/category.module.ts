import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { DatabaseService } from 'src/database.service';
import { CategoryResolver } from './category.resolver';
import { CategoryController } from './category.controller';

@Module({
  providers: [CategoryService, CategoryResolver, DatabaseService],
  controllers: [CategoryController],
})
export class CategoryModule {}
