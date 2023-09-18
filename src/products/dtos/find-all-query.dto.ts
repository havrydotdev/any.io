import { IsOptional, Min } from 'class-validator';
import { IsNumberI18n } from 'src/common/decorators/is-number.decorator';
import OrderByQueryDto from 'src/common/dto/order-by.dto';

export default class FindAllQueryDto extends OrderByQueryDto {
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
