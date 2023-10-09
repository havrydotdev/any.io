import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectDataSource } from '@nestjs/typeorm';
import Analytics from 'src/analytics/entities/analytics.entity';
import Discount from 'src/discounts/entities/discount.entity';
import Product from 'src/products/entities/product.entity';
import { DataSource } from 'typeorm';

@Injectable()
export default class SchedulesService {
  constructor(@InjectDataSource() readonly dataSource: DataSource) {}

  @Cron('0 0 * * *')
  async updateDiscounts() {
    await this.dataSource
      .getRepository(Discount)
      .createQueryBuilder('discount')
      .delete()
      .where('discount.expires_at <= :date', { date: new Date() })
      .execute();
  }

  @Cron('59 23 * * *')
  async updateAnalytics() {
    const analyticsData = await this.dataSource
      .getRepository(Product)
      .createQueryBuilder('product')
      .select()
      .addSelect('product.id, product.daily_views, product.views')
      .getRawMany();

    // TODO: replace this with a service method
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Analytics)
      .values(
        analyticsData.map((analyticsData) => {
          return {
            product: {
              id: analyticsData.product_id,
            },
            daily_views: analyticsData.daily_views,
            views: analyticsData.views,
          };
        }),
      )
      .execute();
  }
}
