import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigService } from 'src/config/services/config/config.service';

const jwtConfig: JwtModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: { expiresIn: '7d' },
  }),
};

export default jwtConfig;
