import IEntity from 'src/common/entities/base.entity';
import Product from 'src/products/entities/product.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('discounts')
class Discount extends IEntity {
  @Column({
    name: 'expires_at',
  })
  expiresAt: Date;

  @Column()
  value: number;

  @Column({
    name: 'new_price',
  })
  newPrice: number;

  @OneToOne(() => Product, (product) => product.discount)
  @JoinColumn()
  product: Product;
}

export default Discount;
