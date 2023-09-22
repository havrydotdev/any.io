import { IsArray, ValidationOptions } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from '../../generated/i18n.generated';

export const IsArrayI18n = (options?: ValidationOptions) =>
  IsArray({
    ...options,
    message: i18nValidationMessage<I18nTranslations>('validate.isArray'),
  });
