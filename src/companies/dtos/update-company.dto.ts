import { PartialType } from '@nestjs/swagger';
import CreateCompanyDto from './create-company.dto';

export default class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
