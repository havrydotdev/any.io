import { Test, TestingModule } from '@nestjs/testing';
import { AdsController } from './ads.controller';
import { AdsService } from 'src/ads/services/ads/ads.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import MainPageAd from 'src/ads/entities/main-page-ad.entity';
import SpecialOffer from 'src/ads/entities/special-offer.entity';
import { ImagesModule } from 'src/images/images.module';
import Image from 'src/images/entities/image.entity';
import { ConfigModule } from 'src/config/config.module';

describe('AdsController', () => {
  let controller: AdsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: './test.sqlite',
        }),
        TypeOrmModule.forFeature([MainPageAd, SpecialOffer, Image]),
        ImagesModule,
        ConfigModule,
      ],
      controllers: [AdsController],
      providers: [AdsService],
    }).compile();

    controller = module.get<AdsController>(AdsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
