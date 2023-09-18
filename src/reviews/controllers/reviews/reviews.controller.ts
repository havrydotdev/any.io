import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import CreateReviewDto from 'src/reviews/dtos/create-review.dto';
import { ReviewsService } from 'src/reviews/services/reviews/reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async create(@Body() createDto: CreateReviewDto) {
    const reviewId = await this.reviewsService.create(createDto);
    return {
      ok: true,
      review_id: reviewId,
    };
  }

  @Get()
  async findByProduct(@Query('productId', ParseIntPipe) productId: number) {
    const reviews = await this.reviewsService.findByProduct({
      productId,
    });

    return {
      ok: true,
      reviews,
    };
  }
}
