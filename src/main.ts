import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { I18nValidationExceptionFilter } from './common/filters/i18n-validation-exception.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new I18nValidationExceptionFilter(),
  );

  await app.listen(3000);
}
bootstrap();
