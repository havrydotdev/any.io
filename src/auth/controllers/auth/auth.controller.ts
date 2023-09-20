import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import LoginUserDto from '../../dtos/login-user.dto';
import { AuthService } from '../../../auth/services/auth/auth.service';
import SignUserDto from '../../dtos/sign-user.dto';
import { Public } from '../../../common/decorators/is-public.decorator';
import CreateUserDto from '../../../users/dto/create-user.dto';
import { FastifyRequest } from 'fastify';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiHeader,
  ApiBearerAuth,
} from '@nestjs/swagger';
import ErrorResponse from '../../../common/dto/error.dto';
import IResponse from 'src/common/responses/base.response';

@ApiTags('auth')
@Controller('auth')
@ApiInternalServerErrorResponse({
  type: () => ErrorResponse,
  description: 'Something went wrong',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(200)
  @ApiUnauthorizedResponse({
    type: () => ErrorResponse,
    description: 'Incorrect user`s credentials',
  })
  @ApiOkResponse({
    type: () =>
      IResponse<{
        access_token: number;
      }>,
    description: 'User logged in',
  })
  async login(@Body() reqBody: LoginUserDto): Promise<
    IResponse<{
      access_token: string;
    }>
  > {
    const token = await this.authService.login(reqBody);

    return new IResponse({
      access_token: token,
    });
  }

  @Public()
  @Post('register')
  @HttpCode(200)
  @ApiOkResponse({
    type: () =>
      IResponse<{
        user_id: number;
      }>,
    description: 'User registered',
  })
  async register(@Body() reqBody: CreateUserDto): Promise<
    IResponse<{
      user_id: number;
    }>
  > {
    const userId = await this.authService.register(reqBody);

    return new IResponse({
      user_id: userId,
    });
  }

  @Get('profile')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token from login endpoint',
  })
  @ApiUnauthorizedResponse({
    type: () => ErrorResponse,
    description: 'User isn`t authorized',
  })
  @ApiOkResponse({ type: () => SignUserDto, description: 'User exist' })
  getProfile(@Req() req: FastifyRequest): IResponse<{
    user: SignUserDto;
  }> {
    return new IResponse({
      user: req.user,
    });
  }
}
