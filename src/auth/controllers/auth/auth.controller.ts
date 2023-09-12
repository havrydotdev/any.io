import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import LoginUserDto from '../../../auth/dto/login-user.dto';
import { AuthService } from '../../../auth/services/auth/auth.service';
import SignUserDto from '../../../auth/dto/sign-user.dto';
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
import TokenResponse from '../../response/token.response';
import ErrorResponse from '../../../common/dto/error.dto';
import RegisterResp from 'src/auth/response/register.response';
import GetProfileResp from 'src/auth/response/profile.response';

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
  @ApiUnauthorizedResponse({
    type: () => ErrorResponse,
    description: 'Incorrect user`s credentials',
  })
  @ApiOkResponse({ type: () => TokenResponse, description: 'User logged in' })
  async login(@Body() reqBody: LoginUserDto): Promise<TokenResponse> {
    const token = await this.authService.login(reqBody);

    return {
      access_token: token,
      ok: true,
    };
  }

  @Public()
  @Post('register')
  @ApiOkResponse({ type: () => RegisterResp, description: 'User registered' })
  async register(@Body() reqBody: CreateUserDto): Promise<RegisterResp> {
    const userId = await this.authService.register(reqBody);

    return {
      user_id: userId,
      ok: true,
    };
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
  getProfile(@Req() req: FastifyRequest): GetProfileResp {
    return {
      user: req.user,
      ok: true,
    };
  }
}
