import Category from 'src/categories/entities/category.entity';
import IEntity from 'src/common/entities/base.entity';
import Company from 'src/companies/entities/company.entity';
import Review from 'src/reviews/entities/review.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('products')
export default class Product extends IEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    nullable: false,
  })
  price: number;

  // @Column()
  // image: string;

  // @Column({ type: 'array' })
  // tags: string[];

  @ManyToOne(() => Company, (company) => company.products)
  company: Company;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
