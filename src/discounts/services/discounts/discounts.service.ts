import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nContext, I18nService } from 'nestjs-i18n';
import Company from 'src/companies/entities/company.entity';
import { CompaniesService } from 'src/companies/services/companies/companies.service';
import CreateDiscountDto from 'src/discounts/dtos/create-discount.dto';
import Discount from 'src/discounts/entities/discount.entity';
import { I18nTranslations } from 'src/generated/i18n.generated';
import Product from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/services/products/products.service';
import { Repository } from 'typeorm';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountsRepo: Repository<Discount>,
    private readonly productsService: ProductsService,
    private readonly companiesService: CompaniesService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  async create(userId: number, createDto: CreateDiscountDto): Promise<number> {
    const [product] = await this.doesUserHavePermsToAddDiscount(
      userId,
      createDto.productId,
    );

    // calculate new price
    const newPrice = product.price - (product.price * createDto.value) / 100;

    const res = await this.discountsRepo.insert({
      ...createDto,
      newPrice: Math.floor(newPrice),
      product: {
        id: createDto.productId,
      },
    });

    return res.identifiers[0].id;
  }

  async delete(userId: number, id: number): Promise<void> {
    this.doesUserHavePermsToEditDiscount(userId, id);

    await this.discountsRepo.delete(id);
  }

  // TODO: fix i18n messages
  async doesUserHavePermsToEditDiscount(
    userId: number,
    id: number,
  ): Promise<[Discount, Product, Company]> {
    const discount = await this.doesDiscountExist(id);

    const product = await this.productsService.doesProductExist(
      discount.product.id,
    );

    const company = await this.companiesService.doesUserOwnCompany(
      userId,
      product.company.id,
    );

    return [discount, product, company];
  }

  async doesUserHavePermsToAddDiscount(
    userId: number,
    productId: number,
  ): Promise<[Product, Company]> {
    const product = await this.productsService.doesProductExist(productId);

    const company = await this.companiesService.doesUserOwnCompany(
      userId,
      product.company.id,
    );

    return [product, company];
  }

  async doesDiscountExist(id: number): Promise<Discount> {
    const discount = await this.discountsRepo.findOne({
      where: {
        id,
      },
    });

    if (!discount)
      throw new BadRequestException(
        this.i18n.t('messages.400', I18nContext.current()),
      );

    return discount;
  }
}
