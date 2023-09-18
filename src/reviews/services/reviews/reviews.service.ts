import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import FindAllQueryDto from 'src/reviews/dtos/find-all.query.dto';
import Review from 'src/reviews/entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private readonly reviewsRepo: Repository<Review>,
  ) {}

  async create(review: Review): Promise<Review> {
    return this.reviewsRepo.save(review);
  }

  async findAll({} // orderBy,
  // orderByType,
  // skip,
  // limit,
  : FindAllQueryDto): Promise<Review[]> {
    return this.reviewsRepo.find();
  }
}
