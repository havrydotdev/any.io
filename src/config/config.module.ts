import { Global, Module } from '@nestjs/common';
import { ConfigService } from './services/config/config.service';
import IConfigService from './interfaces/config-service.interface';

@Global()
@Module({
  exports: [IConfigService],
  providers: [
    {
      provide: IConfigService,
      useClass: ConfigService,
    },
    ConfigService,
  ],
})
export class ConfigModule {}
