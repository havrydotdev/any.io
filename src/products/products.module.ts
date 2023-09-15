import { Module } from '@nestjs/common';
import { ProductsService } from './services/products/products.service';
import { ProductsController } from './controllers/products/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Product from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
