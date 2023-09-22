import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateReviewDto from 'src/reviews/dtos/create-review.dto';
import FindAllReviewsQueryDto from 'src/reviews/dtos/find-all.query.dto';
import UpdateReviewDto from 'src/reviews/dtos/update-review.dto';
import Review from 'src/reviews/entities/review.entity';
import { Repository } from 'typeorm';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '../../../generated/i18n.generated';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private readonly reviewsRepo: Repository<Review>,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  async create(review: CreateReviewDto): Promise<number> {
    const res = await this.reviewsRepo.insert({
      ...review,
      product: {
        id: review.productId,
      },
    });

    return res.identifiers[0].id as number;
  }

  async findById(id: number): Promise<Review> {
    return this.reviewsRepo.findOneBy({
      id,
    });
  }

  async update(
    userId: number,
    reviewId: number,
    dto: UpdateReviewDto,
  ): Promise<void> {
    const review = await this.findById(reviewId);
    if (review.user.id !== userId) {
      throw new ForbiddenException(
        this.i18n.t('messages.forbidden_update_review', I18nContext.current()),
      );
    }

    await this.reviewsRepo.update(reviewId, dto);
  }

  async delete(userId: number, id: number): Promise<void> {
    const review = await this.findById(id);
    if (review.user.id !== userId) {
      throw new ForbiddenException(
        this.i18n.t('messages.forbidden_delete_review', I18nContext.current()),
      );
    }

    await this.reviewsRepo.delete(id);
  }

  async findByProduct({
    orderBy,
    orderByType,
    limit = 10,
    page = 0,
    productId,
  }: FindAllReviewsQueryDto): Promise<Review[]> {
    const reviews = this.reviewsRepo
      .createQueryBuilder('review')
      .select()
      .leftJoin('review.product', 'product')
      .where('product.id = :productId', { productId })
      .orderBy('review.created_at', 'DESC')
      .limit(limit)
      .skip(limit * page);

    if (orderBy) {
      reviews.addOrderBy(
        `product.${orderBy}`,
        orderByType.toUpperCase() as 'ASC' | 'DESC',
      );
    }

    return reviews.getMany();
  }
}
