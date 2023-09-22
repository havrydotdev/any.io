import { IsArrayI18n } from 'src/common/decorators/is-array.decorator';
import { IsNotEmptyI18n } from 'src/common/decorators/is-not-empty.decorator';
import { IsNumberI18n } from 'src/common/decorators/is-number.decorator';
import { IsStringI18n } from 'src/common/decorators/is-string.decorator';
import { MinI18n } from 'src/common/decorators/min.decorator';

export default class CreateOrderDto {
  @IsNumberI18n()
  @IsNotEmptyI18n()
  @MinI18n(1)
  userId: number;

  @IsStringI18n()
  @IsNotEmptyI18n()
  comment: string;

  @IsStringI18n()
  @IsNotEmptyI18n()
  warehouse: string;

  @IsArrayI18n({
    each: true,
  })
  @IsNotEmptyI18n()
  products: number[];
}
