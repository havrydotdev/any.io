import { Module } from '@nestjs/common';
import SchedulesService from './services/schedules/schedules.service';

@Module({
  providers: [SchedulesService],
})
export class SchedulesModule {}
