import { IsOptional, IsEnum } from 'class-validator';
import { IsStringI18n } from '../decorators/is-string.decorator';
import PaginationQueryDto from './pagination.dto';

export type OrderByFields = 'id' | 'title' | 'price';
export type OrderByTypes = 'asc' | 'desc';

export default class OrderByQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsStringI18n()
  @IsEnum(['id', 'title', 'price'])
  orderBy?: OrderByFields;

  @IsOptional()
  @IsStringI18n()
  @IsEnum(['asc', 'desc'])
  orderByType?: OrderByTypes;
}
