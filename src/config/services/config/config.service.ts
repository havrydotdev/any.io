import { Injectable, Logger } from '@nestjs/common';
import { DotenvConfigOutput, DotenvParseOutput, config } from 'dotenv';
import IConfigService from 'src/config/interfaces/config-service.interface';

@Injectable()
export class ConfigService implements IConfigService {
  private readonly config: DotenvParseOutput;

  private readonly logger: Logger = new Logger(ConfigService.name);

  private readonly isProd: boolean;

  constructor() {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      this.logger.error('Failed to read .env file');
    } else {
      this.logger.log('Successfully loaded .env config file');
      this.config = result.parsed as DotenvParseOutput;
      this.isProd = this.config.NODE_ENV === 'production';
    }
  }

  get(key: string): string {
    if (this.isProd) {
      return process.env[key];
    } else {
      return this.config[key];
    }
  }
}
