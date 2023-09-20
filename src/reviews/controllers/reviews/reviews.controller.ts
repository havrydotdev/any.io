import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Get,
  Inject,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrderByFields, OrderByTypes } from 'src/common/dto/order-by.dto';
import OrderByTypePipe from 'src/common/pipes/order-by-type.pipe';
import OrderByPipe from 'src/common/pipes/order-by.pipe';
import IResponse from 'src/common/responses/base.response';
import { getReviewsCacheKey } from 'src/common/utils/get-cache-key';
import CreateReviewDto from 'src/reviews/dtos/create-review.dto';
import FindAllReviewsQueryDto from 'src/reviews/dtos/find-all.query.dto';
import Review from 'src/reviews/entities/review.entity';
import { ReviewsService } from 'src/reviews/services/reviews/reviews.service';
import { Cache } from 'cache-manager';
import { FOUR_MINUTES } from 'src/common/constants';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post()
  async create(@Body() createDto: CreateReviewDto): Promise<
    IResponse<{
      review_id: number;
    }>
  > {
    const reviewId = await this.reviewsService.create(createDto);

    return new IResponse({
      review_id: reviewId,
    });
  }

  @Get()
  async findByProduct(
    @Query('productId', ParseIntPipe)
    productId: number,
    @Query('orderByType', OrderByTypePipe) orderByType: OrderByTypes,
    @Query('orderBy', OrderByPipe) orderBy: OrderByFields,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
    @Query('page', new ParseIntPipe({ optional: true })) page: number,
  ): Promise<
    IResponse<{
      reviews: Review[];
    }>
  > {
    const query: FindAllReviewsQueryDto = {
      productId,
      orderByType,
      orderBy,
      limit,
      page,
    };

    const cacheKey = getReviewsCacheKey(query);

    const cachedReviews = await this.cacheManager.get<Review[]>(cacheKey);

    if (!cachedReviews) {
      const reviews = await this.reviewsService.findByProduct(query);

      await this.cacheManager.set(cacheKey, reviews, FOUR_MINUTES);

      return new IResponse({
        reviews,
      });
    } else {
      return new IResponse({
        reviews: cachedReviews,
      });
    }
  }

  @Patch()
  async update() {}
}
