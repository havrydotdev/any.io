import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateMainPageAdDto from 'src/ads/dtos/create-main-page-ad.dto';
import CreateSpecialOfferDto from 'src/ads/dtos/create-special-offer.dto';
import MainPageAd from 'src/ads/entities/main-page-ad.entity';
import SpecialOffer from 'src/ads/entities/special-offer.entity';
import { ImagesService } from 'src/images/services/images/images.service';
import { Repository } from 'typeorm';

@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(MainPageAd)
    private readonly mainAdRepo: Repository<MainPageAd>,
    @InjectRepository(SpecialOffer)
    private readonly specialOfferRepo: Repository<SpecialOffer>,
    private readonly imagesService: ImagesService,
  ) {}

  async getMainPageAd(): Promise<MainPageAd> {
    return (await this.mainAdRepo.find()).at(0);
  }

  async getSpecialOffer(): Promise<SpecialOffer> {
    return (await this.specialOfferRepo.find()).at(0);
  }

  async createMainPageAd(
    { productId }: CreateMainPageAdDto,
    file: Express.Multer.File,
  ): Promise<number> {
    this.mainAdRepo.clear();

    const imageId = await this.imagesService.uploadPublicFile(
      file.buffer,
      file.originalname,
    );

    const insertResult = await this.mainAdRepo.insert({
      product: {
        id: productId,
      },
      image: {
        id: imageId,
      },
    });

    return insertResult.identifiers[0].id;
  }

  async createSpecialOffer(
    { categoryId }: CreateSpecialOfferDto,
    file: Express.Multer.File,
  ): Promise<number> {
    this.specialOfferRepo.clear();

    const imageId = await this.imagesService.uploadPublicFile(
      file.buffer,
      file.originalname,
    );

    const insertResult = await this.specialOfferRepo.insert({
      category: {
        id: categoryId,
      },
      image: {
        id: imageId,
      },
    });

    return insertResult.identifiers[0].id;
  }
}
