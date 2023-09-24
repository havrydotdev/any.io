import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { CoreModule } from './core/core.module';
import { HashingModule } from './hashing/hashing.module';
import { I18nModule } from 'nestjs-i18n';
import { ProductsModule } from './products/products.module';
import { CompaniesModule } from './companies/companies.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CategoriesModule } from './categories/categories.module';
import typeOrmConfig from './common/configs/typeorm.config';
import { CacheModule } from '@nestjs/cache-manager';
import { OrdersModule } from './orders/orders.module';
import { DiscountsModule } from './discounts/discounts.module';
import { ImagesModule } from './images/images.module';
import i18nConfig from './common/configs/i18n.config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    // TODO: add polish language
    I18nModule.forRootAsync(i18nConfig),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    ConfigModule,
    CoreModule,
    HashingModule,
    ProductsModule,
    CompaniesModule,
    ReviewsModule,
    CategoriesModule,
    OrdersModule,
    DiscountsModule,
    ImagesModule,
  ],
})
export class AppModule {}
