import IEntity from 'src/common/entities/base.entity';
import Image from 'src/images/entities/image.entity';
import Product from 'src/products/entities/product.entity';
import { Entity, OneToOne } from 'typeorm';

@Entity('main_page_ad')
class MainPageAd extends IEntity {
  @OneToOne(() => Product)
  product: Product;

  @OneToOne(() => Image)
  image: Image;
}

export default MainPageAd;
