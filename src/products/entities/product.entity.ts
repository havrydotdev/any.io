import Company from 'src/companies/entities/company.entity';
import Review from 'src/reviews/entities/review.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'array' })
  tags: string[];

  @ManyToOne(() => Company, (company) => company.products)
  company: Company;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];
}
