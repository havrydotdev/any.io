import { Module } from '@nestjs/common';
import { ReviewsService } from './services/reviews/reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsController } from './controllers/reviews/reviews.controller';
import Review from './entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  providers: [ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
