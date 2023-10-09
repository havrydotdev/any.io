import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import CreateMainPageAdDto from 'src/ads/dtos/create-main-page-ad.dto';
import CreateSpecialOfferDto from 'src/ads/dtos/create-special-offer.dto';
import MainPageAd from 'src/ads/entities/main-page-ad.entity';
import SpecialOffer from 'src/ads/entities/special-offer.entity';
import { AdsService } from 'src/ads/services/ads/ads.service';
import { FastifyFileInterceptor } from 'src/common/interceptors/fastify-file.interceptor';
import IResponse from 'src/common/responses/base.response';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Get('main-page')
  async getMainPageAd(): Promise<
    IResponse<{
      ad: MainPageAd;
    }>
  > {
    const mainPageAd = await this.adsService.getMainPageAd();

    return new IResponse({
      ad: mainPageAd,
    });
  }

  @Get('special-offer')
  async getSpecialOffer(): Promise<
    IResponse<{
      ad: SpecialOffer;
    }>
  > {
    const specialOffer = await this.adsService.getSpecialOffer();

    return new IResponse({
      ad: specialOffer,
    });
  }

  @Post('main-page')
  @UseInterceptors(FastifyFileInterceptor('image'))
  async createMainPageAd(
    @Body() createDto: CreateMainPageAdDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<
    IResponse<{
      ad_id: number;
    }>
  > {
    const mainPageAdId = await this.adsService.createMainPageAd(
      createDto,
      image,
    );

    return new IResponse({
      ad_id: mainPageAdId,
    });
  }

  @Post('special-offer')
  @UseInterceptors(FastifyFileInterceptor('image'))
  async createSpecialOffer(
    @Body() createDto: CreateSpecialOfferDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<
    IResponse<{
      ad_id: number;
    }>
  > {
    const specialOfferId = await this.adsService.createSpecialOffer(
      createDto,
      image,
    );

    return new IResponse({
      ad_id: specialOfferId,
    });
  }
}
