import Category from 'src/categories/entities/category.entity';
import Company from 'src/companies/entities/company.entity';
import Review from 'src/reviews/entities/review.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export default class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    nullable: false,
  })
  price: number;

  @Column({
    name: 'created_at',
  })
  createdAt: Date;

  @Column()
  image: string;

  // @Column({ type: 'array' })
  // tags: string[];

  @ManyToOne(() => Company, (company) => company.products)
  company: Company;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
