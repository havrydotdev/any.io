import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateReviewDto from 'src/reviews/dtos/create-review.dto';
import FindAllReviewsQueryDto from 'src/reviews/dtos/find-all.query.dto';
import UpdateReviewDto from 'src/reviews/dtos/update-review.dto';
import Review from 'src/reviews/entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private readonly reviewsRepo: Repository<Review>,
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

  async update(review: UpdateReviewDto): Promise<Review> {
    return this.reviewsRepo.save(review);
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
