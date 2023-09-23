import IEntity from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('images')
export default class Image extends IEntity {
  @Column()
  url: string;

  @Column()
  key: string;
}
