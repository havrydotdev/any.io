import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
