import { MaxLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';

export const MaxLengthI18n = (value?: number) =>
  MaxLength(value ?? 16, {
    message: i18nValidationMessage<I18nTranslations>('validate.maxLength', {
      len: value ?? 16,
    }),
  });
