import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { I18nService } from 'nestjs-i18n';
import { FOUR_MINUTES } from 'src/common/constants';
import PaginationDto from 'src/common/dto/pagination.dto';
import {
  getOrderCacheKey,
  getOrdersCacheKey,
} from 'src/common/utils/get-cache-key';
import { I18nTranslations } from 'src/generated/i18n.generated';
import CreateOrderDto from 'src/orders/dtos/create-order.dto';
import Order from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly ordersRepo: Repository<Order>,
    private readonly i18n: I18nService<I18nTranslations>,
    private readonly cache: Cache,
  ) {}

  async create(createDto: CreateOrderDto): Promise<number> {
    const res = await this.ordersRepo.insert({
      ...createDto,
      user: {
        id: createDto.userId,
      },
      products: createDto.products.map((id) => ({
        id: id,
      })),
    });

    return res.identifiers[0].id;
  }

  async findByUserId(
    userId: number,
    { page = 0, limit = 10 }: PaginationDto,
  ): Promise<Order[]> {
    const cacheKey = getOrdersCacheKey(userId, { page, limit });

    const cachedOrders = await this.cache.get<Order[]>(cacheKey);
    if (cachedOrders) {
      return cachedOrders;
    }

    const orders = await this.ordersRepo
      .createQueryBuilder('order')
      .select()
      .leftJoin('order.user', 'user')
      .leftJoinAndSelect('order.products', 'products')
      .where('user.id = :userId', { userId })
      .orderBy('order.created_at', 'DESC')
      .skip(page * limit)
      .take(limit)
      .getMany();

    this.cache.set(cacheKey, orders, FOUR_MINUTES);

    return orders;
  }

  async findById(userId: number, id: number): Promise<Order> {
    const cacheKey = getOrderCacheKey(userId, id);

    const cachedOrder = await this.cache.get<Order>(cacheKey);
    if (cachedOrder) {
      return cachedOrder;
    }

    const order = await this.ordersRepo.findOne({
      where: {
        id,
      },
      relations: {
        products: true,
        user: true,
      },
    });

    if (order.user.id !== userId) {
      throw new ForbiddenException(this.i18n.t('messages.no_rows_updated'));
    }

    this.cache.set(cacheKey, order, FOUR_MINUTES);

    return order;
  }
}
