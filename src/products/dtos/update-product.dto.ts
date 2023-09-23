import { PartialType } from '@nestjs/swagger';
import CreateProductDto from './create-product.dto';

export default class UpdateProductDto extends PartialType(CreateProductDto) {}
