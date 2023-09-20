import OrderByQueryDto from 'src/common/dto/order-by.dto';

export default class FindAllReviewsQueryDto extends OrderByQueryDto {
  productId: number;
}
