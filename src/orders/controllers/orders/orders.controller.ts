import { Controller, ParseIntPipe, Query, Req } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import IResponse from 'src/common/responses/base.response';
import Order from 'src/orders/entities/order.entity';
import { OrdersService } from 'src/orders/services/orders/orders.service';

// TODO: Implement this controller
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

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
}
