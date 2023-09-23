import { Module } from '@nestjs/common';
import { CompaniesService } from './services/companies/companies.service';
import { CompaniesController } from './controllers/companies/companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Company from './entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  exports: [CompaniesService],
  providers: [CompaniesService],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
