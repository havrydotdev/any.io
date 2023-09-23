import { Module } from '@nestjs/common';
import { ImagesService } from './services/images/images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Image from './entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [ImagesService],
})
export class ImagesModule {}
