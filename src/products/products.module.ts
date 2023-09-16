import { Module } from '@nestjs/common';
import { ProductsService } from './services/products/products.service';
import { ProductsController } from './controllers/products/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Product from './entities/product.entity';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CompaniesModule],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
