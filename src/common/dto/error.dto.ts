import { ApiProperty } from '@nestjs/swagger';

export default class ErrorResponse {
  @ApiProperty({
    oneOf: [
      { type: 'string' },
      {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    ],
    nullable: false,
    example: 'Invalid email',
  })
  message: string | string[];

  @ApiProperty({
    type: 'string',
    description: 'Short error description',
    nullable: false,
  })
  ok: boolean;

  @ApiProperty({
    type: 'number',
    description: 'Status code',
    nullable: false,
  })
  status: number;
}
