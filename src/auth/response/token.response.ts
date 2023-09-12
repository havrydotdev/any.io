import { ApiProperty } from '@nestjs/swagger';

export default class TokenResponse {
  @ApiProperty({
    type: 'string',
    nullable: false,
  })
  access_token: string;

  @ApiProperty({
    type: 'boolean',
    nullable: false,
  })
  ok: boolean;
}
