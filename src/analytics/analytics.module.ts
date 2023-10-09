import { Module } from '@nestjs/common';
import { AnalyticsService } from './services/analytics/analytics.service';

@Module({
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
