import { Injectable, Logger } from '@nestjs/common';
import { DotenvConfigOutput, DotenvParseOutput, config } from 'dotenv';

// TODO: Add interface for this class
@Injectable()
export class ConfigService {
  private config: DotenvParseOutput;

  private readonly logger = new Logger(ConfigService.name);

  constructor() {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      this.logger.error('Failed to read .env file');
    } else {
      this.logger.log('Successfully loaded .env config file');
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get(key: string): string {
    return this.config[key];
  }
}
