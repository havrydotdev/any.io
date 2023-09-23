import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories/categories.service';
import { CategoriesController } from './controllers/categories/categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Category from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  exports: [CategoriesService],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
