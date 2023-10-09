import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import IResponse from 'src/common/responses/base.response';
import CreateOrderDto from 'src/orders/dtos/create-order.dto';
import Order from 'src/orders/entities/order.entity';
import { OrdersService } from 'src/orders/services/orders/orders.service';

// TODO: test this huinya
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(
    @Req() req: FastifyRequest,
    @Body() dto: CreateOrderDto,
  ): Promise<
    IResponse<{
      order_id: number;
    }>
  > {
    dto.userId = req.user.id;

    const orderId = await this.ordersService.create(dto);
    return new IResponse({
      order_id: orderId,
    });
  }

  @Get()
  async findByUser(
    @Req() req: FastifyRequest,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ): Promise<
    IResponse<{
      orders: Order[];
    }>
  > {
    const orders = await this.ordersService.findByUserId(req.user.id, {
      page,
      limit,
    });
    return new IResponse({
      orders,
    });
  }

  @Get('id')
  async findById(
    @Req() req: FastifyRequest,
    @Query('id', ParseIntPipe) id: number,
  ): Promise<
    IResponse<{
      order: Order;
    }>
  > {
    const order = await this.ordersService.findById(req.user.id, id);

    return new IResponse({
      order,
    });
  }
}
