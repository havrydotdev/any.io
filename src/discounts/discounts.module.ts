import { Module } from '@nestjs/common';
import { DiscountsService } from './services/discounts/discounts.service';
import { DiscountsController } from './controllers/discounts/discounts.controller';

@Module({
  providers: [DiscountsService],
  controllers: [DiscountsController]
})
export class DiscountsModule {}
