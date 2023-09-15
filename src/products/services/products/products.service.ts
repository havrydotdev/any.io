// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import Product from 'src/products/entities/product.entity';
// import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  //   constructor(
  //     @InjectRepository(Product)
  //     private readonly productsRepo: Repository<Product>,
  //   ) {}
  //   async findAll(
  //     orderBy: 'id' | 'title' | 'price',
  //     orderByType: 'ASC' | 'DESC',
  //     limit: number,
  //     page: number,
  //   ): Promise<Product[]> {
  //     this.productsRepo
  //       .createQueryBuilder('products')
  //       .addOrderBy(orderBy, orderByType);
  //   }
  //   async findById(productId: number): Promise<Product> {}
  //   async create() {}
}
