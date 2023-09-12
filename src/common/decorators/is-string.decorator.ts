import { IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';

export const IsStringI18n = () =>
  IsString({
    message: i18nValidationMessage<I18nTranslations>('validate.isString'),
  });
