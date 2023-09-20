import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import CreateCategoryDto from 'src/categories/dtos/create-category.dto';
import Category from 'src/categories/entities/category.entity';
import { CategoriesService } from 'src/categories/services/categories/categories.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import IResponse from 'src/common/responses/base.response';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll(): Promise<
    IResponse<{
      categories: Category[];
    }>
  > {
    const categories = await this.categoriesService.findAll();
    return new IResponse({
      categories,
    });
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async create(@Body() createDto: CreateCategoryDto): Promise<
    IResponse<{
      category_id: number;
    }>
  > {
    const createdCategoryId = await this.categoriesService.create(createDto);
    return new IResponse({
      category_id: createdCategoryId,
    });
  }
}
