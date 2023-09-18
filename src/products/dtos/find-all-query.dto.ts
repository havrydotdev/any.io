import { IsEnum, IsOptional, Min } from 'class-validator';
import { IsNumberI18n } from 'src/common/decorators/is-number.decorator';
import { IsStringI18n } from 'src/common/decorators/is-string.decorator';

export type OrderByFields = 'id' | 'title' | 'price';
export type OrderByTypes = 'asc' | 'desc';

export default class FindAllQueryDto {
  @IsOptional()
  @IsStringI18n()
  @IsEnum(['id', 'title', 'price'])
  orderBy?: OrderByFields;

  @IsOptional()
  @IsStringI18n()
  @IsEnum(['asc', 'desc'])
  orderByType?: OrderByTypes;

  @IsOptional()
  @IsNumberI18n()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsNumberI18n()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsNumberI18n()
  @Min(0)
  minPrice: number;

  @IsOptional()
  @IsNumberI18n()
  @Min(0)
  maxPrice: number;

  @IsOptional()
  @IsNumberI18n()
  @Min(0)
  categoryId?: number;

  @IsOptional()
  lastCategories?: number[];
}
