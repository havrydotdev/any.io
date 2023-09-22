import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Public } from 'src/common/decorators/is-public.decorator';
import { OrderByFields, OrderByTypes } from 'src/common/dto/order-by.dto';
import OrderByTypePipe from 'src/common/pipes/order-by-type.pipe';
import OrderByPipe from 'src/common/pipes/order-by.pipe';
import IResponse from 'src/common/responses/base.response';
import { I18nTranslations } from 'src/generated/i18n.generated';
import CreateProductDto from 'src/products/dtos/create-product.dto';
import Product from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/services/products/products.service';
import UpdateProductDto from 'src/products/dtos/update-product.dto';

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
  ): Promise<
    IResponse<{
      products: Product[];
    }>
  > {
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

    const products: Product[] = await this.productsService.findAll({
      orderByType,
      orderBy,
      limit,
      page,
      minPrice,
      maxPrice,
      categoryId,
      lastCategories,
    });

    return new IResponse({
      products,
    });
  }

  @Post()
  async create(
    @Req() req: FastifyRequest,
    @Body() createDto: CreateProductDto,
  ): Promise<
    IResponse<{
      product_id: number;
    }>
  > {
    const productId: number = await this.productsService.create(
      req.user.id,
      createDto,
    );

    return new IResponse({
      product_id: productId,
    });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateProductDto,
    @Req() req: FastifyRequest,
  ): Promise<IResponse<undefined>> {
    await this.productsService.update(req.user.id, id, updateDto);
    return new IResponse(undefined);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: FastifyRequest,
  ): Promise<IResponse<undefined>> {
    await this.productsService.delete(req.user.id, id);
    return new IResponse(undefined);
  }
}
