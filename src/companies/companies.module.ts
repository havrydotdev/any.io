import { Module } from '@nestjs/common';
import { CompaniesService } from './services/companies/companies.service';
import { CompaniesController } from './controllers/companies/companies.controller';

@Module({
  providers: [CompaniesService],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
