import { Expose, Transform } from 'class-transformer';
import { IsNotEmptyI18n } from 'src/common/decorators/is-not-empty.decorator';
import { IsNumberI18n } from 'src/common/decorators/is-number.decorator';
import { IsStringI18n } from 'src/common/decorators/is-string.decorator';
import { MinI18n } from '../../common/decorators/min.decorator';

export default class CreateReviewDto {
  @IsStringI18n()
  @IsNotEmptyI18n()
  text: string;

  @IsNotEmptyI18n()
  @IsNumberI18n()
  @MinI18n(1)
  rate: number;

  @IsNotEmptyI18n()
  @IsNumberI18n()
  @MinI18n(1)
  @Expose()
  @Transform(({ value, obj }) =>
    typeof value === 'undefined' ? obj['product_id'] : value,
  )
  productId: number;
}
