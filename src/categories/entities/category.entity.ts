import Product from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  title: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
