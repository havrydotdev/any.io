import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nAsyncOptions,
  QueryResolver,
} from 'nestjs-i18n';
import { join } from 'path';
import { ConfigService } from 'src/config/services/config/config.service';

const i18nConfig: I18nAsyncOptions = {
  useFactory: (configService: ConfigService) => ({
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
  inject: [ConfigService],
};

export default i18nConfig;
