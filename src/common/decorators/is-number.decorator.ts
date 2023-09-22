import { IsNumber, IsNumberOptions } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';

export const IsNumberI18n = (options?: IsNumberOptions) =>
  IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
      ...options,
    },
    {
      message: i18nValidationMessage<I18nTranslations>('validate.isNumber'),
    },
  );
