import { IsEnum, IsOptional, Min } from 'class-validator';
import { IsNumberI18n } from 'src/common/decorators/is-number.decorator';
import { IsStringI18n } from 'src/common/decorators/is-string.decorator';
import PaginationDto from 'src/common/dto/pagination.dto';

export type OrderByFields = 'id' | 'title' | 'price';
export type OrderByTypes = 'asc' | 'desc';

export default class FindAllQueryDto extends PaginationDto {
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

  get sqlOrderType(): 'ASC' | 'DESC' {
    return this.orderByType?.toUpperCase() as 'ASC' | 'DESC';
  }
}
