import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { CoreModule } from './core/core.module';
import { HashingModule } from './hashing/hashing.module';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { join } from 'path';
import { ConfigService } from './config/services/config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory(config: ConfigService) {
        return {
          type: config.get('DB_TYPE') as 'mysql' | 'postgres' | 'sqlite',
          database: config.get('DB_NAME'),
          username: config.get('DB_USERNAME'),
          logging: config.get('DB_LOGGING') === 'true',
          port: parseInt(config.get('DB_PORT')),
          host: config.get('DB_HOST'),
          password: config.get('DB_PASSWORD'),
          synchronize: config.get('DB_SYNCHRONIZE') === 'true',
          entities: [__dirname + '/../*.entity{.ts,.js}'],
        };
      },
      inject: [ConfigService],
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.get('FALLBACK_LANGUAGE') ?? 'en',
        loaderOptions: {
          path: join(__dirname, '/i18n/'),
          watch: true,
        },
        typesOutputPath: join(__dirname, '../src/generated/i18n.generated.ts'),
      }),
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ConfigModule,
    CoreModule,
    HashingModule,
  ],
})
export class AppModule {}
