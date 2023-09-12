import { MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';

export const MinLengthI18n = (value?: number) =>
  MinLength(value ?? 8, {
    message: i18nValidationMessage<I18nTranslations>('validate.minLength'),
  });
