import { Module } from '@nestjs/common';
import { ProductsService } from './services/products/products.service';
import { ProductsController } from './controllers/products/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
