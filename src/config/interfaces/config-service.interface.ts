import { Injectable } from '@nestjs/common';

@Injectable()
export default abstract class IConfigService {
  abstract get(key: string): string;
}
