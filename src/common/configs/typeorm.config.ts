import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigService } from 'src/config/services/config/config.service';

const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  useFactory(config: ConfigService) {
    return {
      type: config.get('DB_TYPE') as 'mysql' | 'postgres' | 'sqlite',
      database: config.get('DB_NAME'),
      username: config.get('DB_USERNAME'),
      logging: config.get('DB_LOGGING') === 'true',
      port: parseInt(config.get('DB_PORT')),
      host: config.get('DB_HOST'),
      password: config.get('DB_PASSWORD'),
      synchronize: config.get('DB_SYNCHRONIZE') === 'true',
      entities: [__dirname + '/../*.entity{.ts,.js}'],
    };
  },
  inject: [ConfigService],
};

export default typeOrmConfig;
