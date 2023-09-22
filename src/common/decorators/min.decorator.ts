import { Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from '../../generated/i18n.generated';

export const MinI18n = (value: number) =>
  Min(value, {
    message: i18nValidationMessage<I18nTranslations>('validate.min'),
  });
