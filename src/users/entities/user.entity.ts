import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/common/enums/roles.enum';
import Company from 'src/companies/entities/company.entity';
import Review from 'src/reviews/entities/review.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({
    type: 'number',
    nullable: false,
    description: 'User id',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: 'string',
    nullable: false,
    description: 'User name',
    example: 'Wade Allen',
  })
  @Column({
    nullable: false,
  })
  name: string;

  @ApiProperty({
    type: 'string',
    nullable: false,
    description: 'User email',
    example: 'example@gmail.com',
  })
  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    type: 'string',
    nullable: false,
    description: "User password (isn't returned in getProfile method)",
    example: 'secret_password',
  })
  @Column({
    nullable: false,
    select: false,
  })
  password: string;

  @ApiProperty({
    type: 'number',
    nullable: false,
    description: 'User balance',
    example: 300,
  })
  @Column({
    nullable: false,
    default: 0,
  })
  balance: number;

  @Column({
    enum: Role,
    enumName: 'role',
    nullable: false,
    default: Role.Client,
  })
  role: Role;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToOne(() => Company, (company) => company.user, {
    nullable: true,
  })
  company: Company;
}
