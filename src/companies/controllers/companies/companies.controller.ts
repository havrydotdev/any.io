import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import IResponse from 'src/common/responses/base.response';
import CreateCompanyDto from 'src/companies/dtos/create-company.dto';
import UpdateCompanyDto from 'src/companies/dtos/update-company.dto';
import Company from 'src/companies/entities/company.entity';
import { CompaniesService } from 'src/companies/services/companies/companies.service';

// TODO: Add delete method
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  async create(
    @Body() companyDto: CreateCompanyDto,
    @Req() req: FastifyRequest,
  ): Promise<
    IResponse<{
      company_id: number;
    }>
  > {
    const companyId = await this.companiesService.create(
      req.user.id,
      companyDto,
    );

    return new IResponse({
      company_id: companyId,
    });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) companyId: number,
    @Body() updateDto: UpdateCompanyDto,
  ): Promise<
    IResponse<{
      company_id: number;
    }>
  > {
    const updatedCompanyId = await this.companiesService.update(
      companyId,
      updateDto,
    );

    return new IResponse({
      company_id: updatedCompanyId,
    });
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) companyId: number): Promise<
    IResponse<{
      company: Company;
    }>
  > {
    const company = await this.companiesService.findById(companyId);
    return new IResponse({
      company,
    });
  }
}
