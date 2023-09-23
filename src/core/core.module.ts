import { Module } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { I18nValidationPipe } from 'nestjs-i18n';
import { JwtAuthGuard } from 'src/common/guards/jwt/jwt-auth.guard';

@Module({
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_PIPE, useValue: new I18nValidationPipe() },
  ],
})
export class CoreModule {}
