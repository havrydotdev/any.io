import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), BcryptModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
