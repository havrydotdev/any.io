import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import HashingService from 'src/hashing/interfaces/hashing-service.interface';

@Injectable()
export class BcryptService implements HashingService {
  encodePassword(raw: string): string {
    const SALT = bcrypt.genSaltSync(10, 'a');
    return bcrypt.hashSync(raw, SALT);
  }

  comparePasswords(raw: string, hash: string): boolean {
    return bcrypt.compareSync(raw, hash);
  }
}
