import { Module } from '@nestjs/common';
import { BcryptService } from './services/bcrypt/bcrypt.service';

@Module({
  exports: [BcryptService],
  providers: [BcryptService],
})
export class HashingModule {}
