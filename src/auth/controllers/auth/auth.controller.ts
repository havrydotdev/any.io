import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import LoginUserDto from '../../dtos/login-user.dto';
import SignUserDto from '../../dtos/sign-user.dto';
import { Public } from '../../../common/decorators/is-public.decorator';
import CreateUserDto from '../../../users/dto/create-user.dto';
import { FastifyReply, FastifyRequest } from 'fastify';
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
import IAuthService from 'src/auth/interfaces/auth-service.interface';

@ApiTags('auth')
@Controller('auth')
@ApiInternalServerErrorResponse({
  type: () => ErrorResponse,
  description: 'Something went wrong',
})
export class AuthController {
  constructor(private authService: IAuthService) {}

  @Public()
  @Post('login')
  @HttpCode(200)
  @ApiUnauthorizedResponse({
    type: () => ErrorResponse,
    description: 'Incorrect user`s credentials',
  })
  @ApiOkResponse({
    type: () => IResponse<undefined>,
    description: 'User logged in',
  })
  async login(
    @Body() reqBody: LoginUserDto,
    @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<IResponse<undefined>> {
    const token = await this.authService.login(reqBody);

    // TODO: add hashing for all cookies and expiration date
    res.setCookie('any.io_auth_token', token);

    return new IResponse(undefined);
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
