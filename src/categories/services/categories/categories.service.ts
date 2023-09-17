import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateCategoryDto from 'src/categories/dtos/create-category.dto';
import Category from 'src/categories/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepo: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoriesRepo.find();
  }

  async findById(categoryId: number): Promise<Category> {
    return this.categoriesRepo.findOneBy({
      id: categoryId,
    });
  }

  async create(createDto: CreateCategoryDto): Promise<number> {
    const res = await this.categoriesRepo.insert(createDto);
    return res.identifiers[0].id as number;
  }
}
