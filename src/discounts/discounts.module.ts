import { Module } from '@nestjs/common';
import { DiscountsService } from './services/discounts/discounts.service';
import { DiscountsController } from './controllers/discounts/discounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Discount from './entities/discount.entity';
import { ProductsModule } from 'src/products/products.module';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Discount]),
    ProductsModule,
    CompaniesModule,
  ],
  providers: [DiscountsService],
  controllers: [DiscountsController],
})
export class DiscountsModule {}
