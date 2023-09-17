import { ApiProperty } from '@nestjs/swagger';
import { IsEmailI18n } from 'src/common/decorators/is-email.decorator';
import { IsNotEmptyI18n } from 'src/common/decorators/is-not-empty.decorator';
import { IsStringI18n } from 'src/common/decorators/is-string.decorator';
import { MaxLengthI18n } from 'src/common/decorators/max-length.decorator';
import { MinLengthI18n } from 'src/common/decorators/min-length.decorator';

export default class CreateUserDto {
  @ApiProperty({
    required: true,
    type: 'string',
    title: 'email',
    description: 'User`s email',
    example: 'example@gmail.com',
  })
  @IsStringI18n()
  @IsNotEmptyI18n()
  @IsEmailI18n()
  email: string;

  @ApiProperty({
    required: true,
    type: 'string',
    title: 'email',
    description: 'User`s password',
    example: 'example@gmail.com',
  })
  @IsStringI18n()
  @IsNotEmptyI18n()
  @MinLengthI18n()
  @MaxLengthI18n()
  password: string;

  @ApiProperty({
    required: true,
    type: 'string',
    title: 'name',
    description: 'User`s name',
    example: 'Wade Allen',
  })
  @IsStringI18n()
  @IsNotEmptyI18n()
  name: string;
}
