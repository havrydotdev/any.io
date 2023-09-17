import { IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';

export const IsNotEmptyI18n = () =>
  IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validate.isNotEmpty'),
  });
