import Category from 'src/categories/entities/category.entity';
import Image from 'src/images/entities/image.entity';
import { Entity, OneToOne } from 'typeorm';

@Entity('special_offer')
class SpecialOffer {
  @OneToOne(() => Category)
  category: Category;

  @OneToOne(() => Image)
  image: Image;
}

export default SpecialOffer;
