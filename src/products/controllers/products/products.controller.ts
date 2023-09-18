import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Public } from 'src/common/decorators/is-public.decorator';
import OrderByTypePipe from 'src/common/pipes/order-by-type.pipe';
import OrderByPipe from 'src/common/pipes/order-by.pipe';
import CreateProductDto from 'src/products/dtos/create-product.dto';
import {
  OrderByFields,
  OrderByTypes,
} from 'src/products/dtos/find-all-query.dto';
import Product from 'src/products/entities/product.entity';
import CreateProductResponse from 'src/products/responses/create-product.response';
import { ProductsService } from 'src/products/services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Public()
  async findAll(
    @Query('order_by_type', OrderByTypePipe) orderByType: OrderByTypes,
    @Query('order_by', OrderByPipe) orderBy: OrderByFields,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
    @Query('page', new ParseIntPipe({ optional: true })) page: number,
    @Query('min_price', new ParseIntPipe({ optional: true })) minPrice: number,
    @Query('max_price', new ParseIntPipe({ optional: true })) maxPrice: number,
    @Query('category') categoryId: number,
    @Req() req: FastifyRequest,
    @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<Product[]> {
    if (categoryId) {
      const lastCategories: string[] = JSON.parse(
        req.cookies['lastCategories'] ?? '[]',
      );

      res.setCookie(
        'lastCategories',
        JSON.stringify([categoryId, ...lastCategories]),
      );
    }

    return this.productsService.findAll({
      orderByType,
      orderBy,
      limit,
      page,
      minPrice,
      maxPrice,
      categoryId,
    });
  }

  @Post()
  async create(
    @Req() req: FastifyRequest,
    @Body() createDto: CreateProductDto,
  ): Promise<CreateProductResponse> {
    const productId = await this.productsService.create(req.user.id, createDto);

    return {
      ok: true,
      product_id: productId,
    };
  }
}
