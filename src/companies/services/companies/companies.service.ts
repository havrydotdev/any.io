import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nContext, I18nService } from 'nestjs-i18n';
import CreateCompanyDto from 'src/companies/dtos/create-company.dto';
import UpdateCompanyDto from 'src/companies/dtos/update-company.dto';
import Company from 'src/companies/entities/company.entity';
import { I18nTranslations } from 'src/generated/i18n.generated';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companiesRepo: Repository<Company>,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  async create(userId: number, companyDto: CreateCompanyDto): Promise<number> {
    const res = await this.companiesRepo.insert({
      ...companyDto,
      user: {
        id: userId,
      },
    });

    return res.identifiers[0].id as number;
  }

  async findById(companyId: number): Promise<Company> {
    const company = await this.companiesRepo.findOne({
      where: {
        id: companyId,
      },
      relations: {
        products: true,
        user: true,
      },
    });

    if (!company) {
      throw new BadRequestException(
        this.i18n.t('messages.no_rows_updated', I18nContext.current()),
      );
    }

    return company;
  }

  async findByUserId(userId: number): Promise<Company> {
    return this.companiesRepo.findOneBy({
      user: {
        id: userId,
      },
    });
  }

  async update(userId: number, updateDto: UpdateCompanyDto): Promise<number> {
    const company = await this.findByUserId(userId);
    if (!company || company.user.id !== userId) {
      throw new ForbiddenException(
        this.i18n.t(
          'messages.user_does_not_own_company',
          I18nContext.current(),
        ),
      );
    }

    const res = await this.companiesRepo.update(
      {
        id: company.id,
      },
      updateDto,
    );

    if (res.affected !== 1) {
      throw new InternalServerErrorException(
        this.i18n.t('messages.no_rows_updated', I18nContext.current()),
      );
    }

    return res.generatedMaps[0].id;
  }

  async delete(userId: number, companyId: number): Promise<void> {
    const company = await this.findByUserId(userId);
    if (!company || company.id !== companyId) {
      throw new ForbiddenException(
        this.i18n.t(
          'messages.user_does_not_own_company',
          I18nContext.current(),
        ),
      );
    }

    await this.companiesRepo.delete({
      id: companyId,
    });
  }
}
