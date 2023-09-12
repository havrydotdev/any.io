import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import LoginUserDto from '../../../auth/dto/login-user.dto';
import { UsersService } from '../../../users/services/users/users.service';
import CreateUserDto from '../../../users/dto/create-user.dto';
import SignUserDto from '../../../auth/dto/sign-user.dto';
import { BcryptService } from 'src/bcrypt/services/bcrypt/bcrypt.service';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
    private readonly i18n: I18nService,
  ) {}

  async validateUser({
    email,
    password,
  }: LoginUserDto): Promise<SignUserDto | null> {
    const user = await this.usersService.findOne(email);
    if (user && this.bcryptService.comparePasswords(password, user.password)) {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    }

    return null;
  }

  async login(loginDto: LoginUserDto): Promise<string> {
    const signPayload = await this.validateUser({
      email: loginDto.email,
      password: loginDto.password,
    });

    if (!signPayload) {
      this.logger.error(`Invalid credentials for user ${loginDto.email}`);
      throw new UnauthorizedException({
        message: this.i18n.t('messages.incorrect_creds', {
          lang: I18nContext.current().lang,
        }),
      });
    }

    return this.jwtService.sign({
      id: signPayload.id,
      email: signPayload.email,
      name: signPayload.name,
    });
  }

  async register(regDto: CreateUserDto): Promise<number> {
    regDto.password = this.bcryptService.encodePassword(regDto.password);
    const user = await this.usersService.findOne(regDto.email);
    if (user) {
      this.logger.error(`User with email ${regDto.email} does already exist`);
      throw new BadRequestException({
        message: this.i18n.t('messages.email_exists', {
          lang: I18nContext.current().lang,
        }),
      });
    }

    return this.usersService.create(regDto);
  }
}
