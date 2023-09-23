import IEntity from 'src/common/entities/base.entity';
import Product from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('companies')
export default class Company extends IEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Product, (product) => product.company)
  products: Product[];

  @OneToOne(() => User, (user) => user.id, {
    nullable: true,
  })
  @JoinColumn()
  user: User;
}
