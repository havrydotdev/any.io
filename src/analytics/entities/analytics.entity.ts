import IEntity from 'src/common/entities/base.entity';
import Product from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
class Analytics extends IEntity {
  @Column({
    name: 'daily_views',
    nullable: false,
  })
  dailyViews: number;

  @Column({
    nullable: false,
  })
  views: number;

  @ManyToOne(() => Product, (product) => product.analytics)
  product: Product;
}

export default Analytics;
