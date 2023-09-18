import Product from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('companies')
export default class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    name: 'created_at',
  })
  createdAt: Date;

  @OneToMany(() => Product, (product) => product.company)
  products: Product[];

  @OneToOne(() => User, (user) => user.id, {
    nullable: true,
  })
  @JoinColumn()
  user: User;
}
