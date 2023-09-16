import { IsNumber } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';

export const IsNumberI18n = () =>
  IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    {
      message: i18nValidationMessage<I18nTranslations>('validate.isNumber'),
    },
  );
