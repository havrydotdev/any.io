import IEntity from 'src/common/entities/base.entity';
import Product from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('reviews')
export default class Review extends IEntity {
  @Column()
  text: string;

  @Column({
    type: 'float',
  })
  rate: number;

  @ManyToOne(() => Product, (product) => product.reviews)
  product: Product;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;
}
