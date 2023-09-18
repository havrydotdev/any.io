import OrderByQueryDto from 'src/common/dto/order-by.dto';

export default class FindAllQueryDto extends OrderByQueryDto {
  productId: number;
}
