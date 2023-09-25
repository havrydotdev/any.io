import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { CategoriesService } from 'src/categories/services/categories/categories.service';
import {
  getProductCacheKey,
  getProductsCacheKey,
} from 'src/common/utils/get-cache-key';
import UpdateCompanyDto from 'src/companies/dtos/update-company.dto';
import { CompaniesService } from 'src/companies/services/companies/companies.service';
import { I18nTranslations } from 'src/generated/i18n.generated';
import CreateProductDto from 'src/products/dtos/create-product.dto';
import FindAllProductsQueryDto from 'src/products/dtos/find-all-query.dto';
import Product from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { FOUR_MINUTES } from 'src/common/constants';
import { ImagesService } from 'src/images/services/images/images.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepo: Repository<Product>,
    private readonly companiesService: CompaniesService,
    private readonly categoriesService: CategoriesService,
    private readonly imagesService: ImagesService,
    private readonly i18n: I18nService<I18nTranslations>,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async findAll({
    orderBy,
    limit = 10,
    minPrice = 0,
    maxPrice = 99999999999999,
    categoryId,
    lastCategories,
    page = 0,
    orderByType,
  }: FindAllProductsQueryDto): Promise<Product[]> {
    const cacheKey = getProductsCacheKey({
      orderByType,
      orderBy,
      limit,
      page,
      minPrice,
      maxPrice,
      categoryId,
      lastCategories,
    });

    const cachedProducts = await this.cache.get<Product[]>(cacheKey);

    if (cachedProducts) {
      return cachedProducts;
    }

    const products = this.productsRepo
      .createQueryBuilder('product')
      .where('product.price BETWEEN :minPrice AND :maxPrice', {
        minPrice: minPrice,
        maxPrice: maxPrice,
      })
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.discount', 'discount');

    if (categoryId) {
      await this.categoriesService.doesCategoryExist(categoryId);

      products.andWhere('category.id = :categoryId', {
        categoryId,
      });
    }

    if (orderBy) {
      products.orderBy(
        `product.${orderBy}`,
        orderByType.toUpperCase() as 'ASC' | 'DESC',
      );
    } else if (lastCategories && lastCategories.length > 0) {
      products.addOrderBy(
        `(CASE WHEN category.id IN (${lastCategories.join(
          ', ',
        )}) THEN 1 ELSE NULL END)`,
        'DESC',
        'NULLS LAST',
      );
    }

    const productsFromDb = await products
      .limit(limit)
      .offset(limit * page)
      .getMany();

    this.cache.set(cacheKey, productsFromDb, FOUR_MINUTES);

    return productsFromDb;
  }

  // TODO: fix i18n message
  // TODO: store last visited products in cookies or in db in logged in
  async findById(productId: number): Promise<Product> {
    const cacheKey = getProductCacheKey(productId);

    const cachedProduct = await this.cache.get<Product>(cacheKey);
    if (cachedProduct) {
      return cachedProduct;
    }

    const product = await this.productsRepo.findOne({
      where: {
        id: productId,
      },
      relations: {
        company: true,
        category: true,
        discount: true,
      },
    });

    if (!product) {
      throw new BadRequestException(
        this.i18n.t('messages.no_rows_updated', I18nContext.current()),
      );
    }

    this.cache.set(cacheKey, product, FOUR_MINUTES);

    return product;
  }

  async create(
    userId: number,
    createDto: CreateProductDto,
    file: Express.Multer.File,
  ): Promise<number> {
    const company = await this.companiesService.doesUserCompanyExist(userId);

    await this.categoriesService.doesCategoryExist(createDto.categoryId);

    const imageId = await this.imagesService.uploadPublicFile(
      file.buffer,
      file.originalname,
    );

    const res = await this.productsRepo.insert({
      ...createDto,
      company: {
        id: company.id,
      },
      category: {
        id: createDto.categoryId,
      },
      image: {
        id: imageId,
      },
    });

    return res.identifiers[0].id as number;
  }

  // TODO: Fix i18n message
  async update(
    userId: number,
    productId: number,
    updateDto: UpdateCompanyDto,
  ): Promise<void> {
    const product = await this.doesProductExist(productId);

    await this.companiesService.doesUserOwnCompany(userId, product.company.id);

    const res = await this.productsRepo.update(
      {
        id: productId,
      },
      updateDto,
    );

    if (res.affected === 0) {
      throw new InternalServerErrorException(
        this.i18n.t('messages.no_rows_updated', I18nContext.current()),
      );
    }
  }

  // TODO: Fix i18n message
  async delete(userId: number, productId: number): Promise<void> {
    const product = await this.doesProductExist(productId);

    await this.companiesService.doesUserOwnCompany(userId, product.company.id);

    await this.productsRepo.delete({
      id: productId,
    });
  }

  async getTotalPrice(products: number[]): Promise<number> {
    const { total } = await this.productsRepo
      .createQueryBuilder('product')
      .select('SUM(product.price)', 'total')
      .where('product.id IN (:...products)', {
        products,
      })
      .getRawOne();

    return total as number;
  }

  async doesProductExist(productId: number): Promise<Product> {
    const product = await this.findById(productId);

    if (!product) {
      throw new BadRequestException(
        this.i18n.t('messages.no_rows_updated', I18nContext.current()),
      );
    }

    return product;
  }
}
