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
import CreateCompanyDto from 'src/companies/dtos/create-company.dto';
import UpdateCompanyDto from 'src/companies/dtos/update-company.dto';
import Company from 'src/companies/entities/company.entity';
import CreateCompanyResponse from 'src/companies/responses/create-company.response';
import UpdateCompanyResponse from 'src/companies/responses/update-company.response';
import { CompaniesService } from 'src/companies/services/companies/companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  async create(
    @Body() companyDto: CreateCompanyDto,
    @Req() req: FastifyRequest,
  ): Promise<CreateCompanyResponse> {
    const companyId = await this.companiesService.create(
      req.user.id,
      companyDto,
    );

    return {
      ok: true,
      company_id: companyId,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) companyId: number,
    @Body() updateDto: UpdateCompanyDto,
  ): Promise<UpdateCompanyResponse> {
    const updatedCompanyId = await this.companiesService.update(
      companyId,
      updateDto,
    );
    return {
      ok: true,
      company_id: updatedCompanyId,
    };
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) companyId: number,
  ): Promise<Company> {
    return this.companiesService.findById(companyId);
  }
}
