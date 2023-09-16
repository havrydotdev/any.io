import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import CreateCategoryDto from 'src/categories/dtos/create-category.dto';
import Category from 'src/categories/entities/category.entity';
import { CategoriesService } from 'src/categories/services/categories/categories.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async create(@Body() createDto: CreateCategoryDto) {
    const createdCategoryId = this.categoriesService.create(createDto);
    return {
      ok: true,
      category_id: createdCategoryId,
    };
  }
}
