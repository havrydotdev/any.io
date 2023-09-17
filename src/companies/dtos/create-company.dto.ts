import { IsNotEmptyI18n } from 'src/common/decorators/is-not-empty.decorator';
import { IsStringI18n } from 'src/common/decorators/is-string.decorator';

export default class CreateCompanyDto {
  @IsStringI18n()
  @IsNotEmptyI18n()
  name: string;

  @IsStringI18n()
  @IsNotEmptyI18n()
  description: string;
}
