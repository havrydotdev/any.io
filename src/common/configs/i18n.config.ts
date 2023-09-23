import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nAsyncOptions,
  QueryResolver,
} from 'nestjs-i18n';
import { join } from 'path';
import IConfigService from 'src/config/interfaces/config-service.interface';

const i18nConfig: I18nAsyncOptions = {
  useFactory: (configService: IConfigService) => ({
    fallbackLanguage: configService.get('FALLBACK_LANGUAGE') ?? 'en',
    loaderOptions: {
      path: join(__dirname, '../../i18n/'),
      watch: true,
    },
    typesOutputPath: join(
      __dirname,
      '../../../src/generated/i18n.generated.ts',
    ),
  }),
  resolvers: [
    { use: QueryResolver, options: ['lang'] },
    AcceptLanguageResolver,
    new HeaderResolver(['x-lang']),
  ],
  inject: [IConfigService],
};

export default i18nConfig;
