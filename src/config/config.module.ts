import { Global, Module } from '@nestjs/common';
import { ConfigService } from './services/config/config.service';

@Global()
@Module({
  exports: [ConfigService],
  providers: [ConfigService],
})
export class ConfigModule {}
