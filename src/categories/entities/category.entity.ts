import IEntity from 'src/common/entities/base.entity';
import Product from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('categories')
export default class Category extends IEntity {
  @Column({
    nullable: false,
    unique: true,
  })
  title: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
