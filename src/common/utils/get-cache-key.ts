import FindAllProductsQueryDto from 'src/products/dtos/find-all-query.dto';
import FindAllReviewsQueryDto from 'src/reviews/dtos/find-all.query.dto';
import PaginationDto from '../dto/pagination.dto';

const getProductsCacheKey = (query: FindAllProductsQueryDto): string => {
  return `ps${query.categoryId}${query.orderByType}${query.orderBy}${
    query.limit
  }${query.page}${query.minPrice}${
    query.maxPrice
  }${query.lastCategories.toString()}`;
};

const getProductCacheKey = (userId: number, productId: number): string => {
  return `p${userId}${productId}`;
};

const getReviewsCacheKey = (query: FindAllReviewsQueryDto): string => {
  return `r${query.limit}${query.orderBy}${query.orderByType}${query.page}${query.productId}`;
};

const getOrdersCacheKey = (userId: number, query: PaginationDto): string => {
  return `ors${query.limit}${query.page}${userId}`;
};

const getOrderCacheKey = (userId: number, orderId: number): string => {
  return `or${userId}${orderId}`;
};

export {
  getProductsCacheKey,
  getReviewsCacheKey,
  getOrderCacheKey,
  getOrdersCacheKey,
  getProductCacheKey,
};
