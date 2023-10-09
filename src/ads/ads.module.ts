import { Module } from '@nestjs/common';
import { AdsService } from './services/ads/ads.service';
import { AdsController } from './controllers/ads/ads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import SpecialOffer from './entities/special-offer.entity';
import MainPageAd from './entities/main-page-ad.entity';
import { ImagesModule } from 'src/images/images.module';

@Module({
  imports: [TypeOrmModule.forFeature([SpecialOffer, MainPageAd]), ImagesModule],
  providers: [AdsService],
  controllers: [AdsController],
})
export class AdsModule {}
