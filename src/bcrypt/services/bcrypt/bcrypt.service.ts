import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  encodePassword = (raw: string): string => {
    const SALT = bcrypt.genSaltSync(10, 'a');
    return bcrypt.hashSync(raw, SALT);
  };

  comparePasswords = (raw: string, hash: string): boolean => {
    return bcrypt.compareSync(raw, hash);
  };
}
