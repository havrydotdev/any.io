import { IsOptional } from 'class-validator';
import { IsNumberI18n } from 'src/common/decorators/is-number.decorator';
import OrderByQueryDto from 'src/common/dto/order-by.dto';
import { MinI18n } from '../../common/decorators/min.decorator';
import { IsArrayI18n } from '../../common/decorators/is-array.decorator';

export default class FindAllProductsQueryDto extends OrderByQueryDto {
  @IsOptional()
  @IsNumberI18n()
  @MinI18n(0)
  minPrice: number;

  @IsOptional()
  @IsNumberI18n()
  @MinI18n(0)
  maxPrice: number;

  @IsOptional()
  @IsNumberI18n()
  @MinI18n(0)
  categoryId?: number;

  @IsOptional()
  @IsArrayI18n({
    each: true,
  })
  @IsNumberI18n()
  lastCategories?: number[];
}
