import IEntity from 'src/common/entities/base.entity';
import Product from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity('orders')
export default class Order extends IEntity {
  @Column()
  comment: string;

  @Column({
    nullable: false,
  })
  warehouse: string;

  @Column({
    type: 'float',
    nullable: false,
  })
  total: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
}
