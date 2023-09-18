import { PartialType } from '@nestjs/swagger';
import CreateReviewDto from './create-review.dto';

export default class UpdateReviewDto extends PartialType(CreateReviewDto) {}
