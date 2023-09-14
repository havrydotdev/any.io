import { Module } from '@nestjs/common';
import { ReviewsService } from './services/reviews/reviews.service';

@Module({
  providers: [ReviewsService],
})
export class ReviewsModule {}
