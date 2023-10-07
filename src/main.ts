import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nValidationExceptionFilter } from './common/filters/i18n-validation-exception.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ConfigService } from './config/services/config/config.service';
import fastifyCookie from '@fastify/cookie';
import { contentParser } from 'fastify-multer';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

const filters = [
  new HttpExceptionFilter(),
  new I18nValidationExceptionFilter(),
];

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalFilters(...filters);

  app.setGlobalPrefix('api/v1');

  // TODO: Delete this when deployed
  app.enableCors({
    origin: '*',
  });

  const configService = app.get<ConfigService>(ConfigService);

  await app.register(fastifyCookie, {
    secret: configService.get('COOKIES_SECRET'), // for cookies signature
  });

  await app.register(contentParser);

  await app.listen(configService.get('PORT') ?? 3000);
}
bootstrap();
