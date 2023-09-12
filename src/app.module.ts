import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { CoreModule } from './core/core.module';
import { BcryptModule } from './bcrypt/bcrypt.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './dev.sqlite',
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ConfigModule,
    CoreModule,
    BcryptModule,
  ],
})
export class AppModule {}
