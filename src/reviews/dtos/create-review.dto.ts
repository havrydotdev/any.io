import { Expose, Transform } from 'class-transformer';
import { IsPositive, Min } from 'class-validator';
import { IsNotEmptyI18n } from 'src/common/decorators/is-not-empty.decorator';
import { IsNumberI18n } from 'src/common/decorators/is-number.decorator';
import { IsStringI18n } from 'src/common/decorators/is-string.decorator';

// TODO: Add i18n for all validation messages
export default class CreateReviewDto {
  @IsStringI18n()
  @IsNotEmptyI18n()
  text: string;

  @IsNotEmptyI18n()
  @IsNumberI18n()
  @IsPositive()
  rate: number;

  @IsNotEmptyI18n()
  @IsNumberI18n()
  @Min(1)
  @Expose()
  @Transform(({ value, obj }) =>
    typeof value === 'undefined' ? obj['product_id'] : value,
  )
  productId: number;
}
