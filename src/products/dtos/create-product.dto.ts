import { Expose, Transform } from 'class-transformer';
import { IsNotEmptyI18n } from 'src/common/decorators/is-not-empty.decorator';
import { IsNumberI18n } from 'src/common/decorators/is-number.decorator';
import { IsStringI18n } from 'src/common/decorators/is-string.decorator';

export default class CreateProductDto {
  @IsStringI18n()
  @IsNotEmptyI18n()
  title: string;

  @IsStringI18n()
  @IsNotEmptyI18n()
  description: string;

  @IsNotEmptyI18n()
  @IsNumberI18n()
  price: number;

  @IsNumberI18n()
  @IsNotEmptyI18n()
  @Expose()
  @Transform(({ value, obj }) =>
    typeof value === 'undefined' ? obj['category_id'] : value,
  )
  categoryId: number;
}
