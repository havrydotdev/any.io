import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';

@Injectable()
export default class OrderByPipe implements PipeTransform {
  constructor(private readonly i18n: I18nService<I18nTranslations>) {}

  transform(value: any) {
    if (!value) return value;

    if (!['price', 'title', 'id'].includes(value)) {
      throw new BadRequestException(
        this.i18n.t('messages.invalid_order_by', I18nContext.current()),
      );
    }

    return value;
  }
}
