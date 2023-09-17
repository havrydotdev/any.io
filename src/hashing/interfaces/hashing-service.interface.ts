import { Injectable } from '@nestjs/common';

@Injectable()
export default abstract class IHashingService {
  abstract encodePassword(raw: string): string;

  abstract comparePasswords(raw: string, hash: string): boolean;
}
