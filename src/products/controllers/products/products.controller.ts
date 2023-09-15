import { Controller } from '@nestjs/common';
import { ProductsService } from 'src/products/services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //   @Get()
  //   async findAll(
  //     @Query('orderBy') orderBy: string,
  //     @Query('orderByType') orderByType: string,
  //     @Query('limit', ParseIntPipe) limit: number,
  //     @Query('page', ParseIntPipe) page: number,
  //   ): Promise<Product[]> {
  //     if (
  //       !(orderBy in ['id', 'title', 'price']) ||
  //       !(orderByType in ['desc', 'asc'])
  //     ) {
  //       throw new BadRequestException();
  //     }

  //     return this.productsService.findAll(orderBy, orderByType, limit, page);
  //   }
}
