import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { DatabaseService } from 'src/database.service';
import { CategoryResolver } from './category.resolver';

@Module({
  providers: [CategoryService, CategoryResolver, DatabaseService],
})
export class CategoryModule {}
