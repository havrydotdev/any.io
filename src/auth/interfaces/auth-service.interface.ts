import CreateUserDto from 'src/users/dto/create-user.dto';
import LoginUserDto from '../dtos/login-user.dto';
import SignUserDto from '../dtos/sign-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export default abstract class IAuthService {
  abstract validateUser(loginDto: LoginUserDto): Promise<SignUserDto | null>;

  abstract login(loginDto: LoginUserDto): Promise<string>;

  abstract register(regDto: CreateUserDto): Promise<number>;
}
