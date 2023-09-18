import { IsOptional, Min } from 'class-validator';
import { IsNumberI18n } from '../decorators/is-number.decorator';

export default class PaginationDto {
  @IsOptional()
  @IsNumberI18n()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsNumberI18n()
  @Min(1)
  page?: number;
}
