import { Module } from '@nestjs/common';
import { ReviewsService } from './services/reviews/reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Review from './entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  providers: [ReviewsService],
})
export class ReviewsModule {}
