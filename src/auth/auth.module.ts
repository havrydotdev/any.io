import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../common/strategies/jwt/jwt.strategy';
import { UsersService } from '../users/services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from 'src/config/services/config/config.service';
import { HashingModule } from 'src/hashing/hashing.module';
import IHashingService from 'src/hashing/interfaces/hashing-service.interface';
import { BcryptService } from 'src/hashing/services/bcrypt/bcrypt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
    UsersModule,
    PassportModule,
    HashingModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UsersService,
    { provide: IHashingService, useClass: BcryptService },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
