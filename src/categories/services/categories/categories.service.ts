import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nContext, I18nService } from 'nestjs-i18n';
import CreateCategoryDto from 'src/categories/dtos/create-category.dto';
import Category from 'src/categories/entities/category.entity';
import { I18nTranslations } from 'src/generated/i18n.generated';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { FOUR_MINUTES } from 'src/common/constants';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepo: Repository<Category>,
    private readonly i18n: I18nService<I18nTranslations>,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  async findAll(): Promise<Category[]> {
    const cachedCategories = await this.cache.get<Category[]>('cs');
    if (cachedCategories) {
      return cachedCategories;
    }

    const categories = await this.categoriesRepo.find();

    this.cache.set('cs', categories, FOUR_MINUTES);

    return categories;
  }

  async findById(categoryId: number): Promise<Category> {
    return this.categoriesRepo.findOneBy({
      id: categoryId,
    });
  }

  async findByTitle(title: string): Promise<Category> {
    return this.categoriesRepo.findOneBy({
      title: title,
    });
  }

  async create(createDto: CreateCategoryDto): Promise<number> {
    const category = await this.findByTitle(createDto.title);
    if (category) {
      throw new BadRequestException(
        this.i18n.translate(
          'messages.category_already_exists',
          I18nContext.current(),
        ),
      );
    }

    const res = await this.categoriesRepo.insert(createDto);
    return res.generatedMaps[0].id as number;
  }
}
