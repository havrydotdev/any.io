import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import IConfigService from 'src/config/interfaces/config-service.interface';
import { ConfigService } from 'src/config/services/config/config.service';

const jwtConfig: JwtModuleAsyncOptions = {
  inject: [IConfigService],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: { expiresIn: '7d' },
  }),
};

export default jwtConfig;
