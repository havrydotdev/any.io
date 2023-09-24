import Category from 'src/categories/entities/category.entity';
import IEntity from 'src/common/entities/base.entity';
import Company from 'src/companies/entities/company.entity';
import Discount from 'src/discounts/entities/discount.entity';
import Image from 'src/images/entities/image.entity';
import Review from 'src/reviews/entities/review.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('products')
export default class Product extends IEntity {
  @Column()
  title: string;

  @Column({
    name: 'title_uk',
    nullable: true,
  })
  titleUk: string;

  @Column()
  description: string;

  @Column({
    nullable: false,
  })
  price: number;

  @ManyToOne(() => Company, (company) => company.products)
  company: Company;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToOne(() => Image)
  @JoinColumn()
  image: Image;

  @OneToOne(() => Discount, (discount) => discount.product)
  discount: Discount;
}
