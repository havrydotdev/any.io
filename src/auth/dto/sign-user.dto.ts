import { ApiProperty } from '@nestjs/swagger';

export default class SignUserDto {
  @ApiProperty({
    type: 'number',
    description: 'User id',
    nullable: false,
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: 'string',
    description: 'User email',
    nullable: false,
    example: 'example@gmail.com',
  })
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'User name',
    nullable: false,
    example: 'Wade Allen',
  })
  name: string;
}
