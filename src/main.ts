import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { I18nValidationExceptionFilter } from './common/filters/i18n-validation-exception.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ConfigService } from './config/services/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new I18nValidationExceptionFilter(),
  );

  const config = app.get<ConfigService>(ConfigService);

  await app.listen(config.get('PORT') ?? 3000);
}
bootstrap();
