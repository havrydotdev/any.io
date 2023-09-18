import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Public } from 'src/common/decorators/is-public.decorator';
import OrderByTypePipe from 'src/common/pipes/order-by-type.pipe';
import OrderByPipe from 'src/common/pipes/order-by.pipe';
import { I18nTranslations } from 'src/generated/i18n.generated';
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
    @Query('orderByType', OrderByTypePipe) orderByType: OrderByTypes,
    @Query('orderBy', OrderByPipe) orderBy: OrderByFields,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
    @Query('page', new ParseIntPipe({ optional: true })) page: number,
    @Query('minPrice', new ParseIntPipe({ optional: true })) minPrice: number,
    @Query('maxPrice', new ParseIntPipe({ optional: true })) maxPrice: number,
    @Query('category', new ParseIntPipe({ optional: true })) categoryId: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
    @Req() req: FastifyRequest,
    @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<Product[]> {
    const lastCategories: number[] = JSON.parse(
      req.cookies['categories'] || '[]',
    ).map((category: string) => parseInt(category));

    if (categoryId) {
      try {
        res.setCookie(
          'categories',
          JSON.stringify([categoryId, ...lastCategories].slice(0, 3)),
        );
      } catch (error) {
        res.setCookie('categories', '[]');
        throw new InternalServerErrorException(
          i18n.t('messages.invalid_cookies_error'),
        );
      }
    }

    return this.productsService.findAll({
      orderByType,
      orderBy,
      limit,
      page,
      minPrice,
      maxPrice,
      categoryId,
      lastCategories,
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
