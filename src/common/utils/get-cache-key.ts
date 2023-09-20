import FindAllProductsQueryDto from 'src/products/dtos/find-all-query.dto';
import FindAllReviewsQueryDto from 'src/reviews/dtos/find-all.query.dto';

const getProductsCacheKey = (query: FindAllProductsQueryDto) => {
  return `p${query.categoryId}${query.orderByType}${query.orderBy}${
    query.limit
  }${query.page}${query.minPrice}${
    query.maxPrice
  }${query.lastCategories.toString()}`;
};

const getReviewsCacheKey = (query: FindAllReviewsQueryDto) => {
  return `r${query.limit}${query.orderBy}${query.orderByType}${query.page}${query.productId}`;
};

export { getProductsCacheKey, getReviewsCacheKey };
