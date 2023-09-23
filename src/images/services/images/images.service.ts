import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { ConfigService } from 'src/config/services/config/config.service';
import Image from 'src/images/entities/image.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ImagesService {
  private readonly _s3: S3;

  constructor(
    @InjectRepository(Image)
    private imagesRepo: Repository<Image>,
    private readonly configService: ConfigService,
  ) {}

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const uploadResult = await this._s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    const newFile = this.imagesRepo.insert({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });

    return newFile;
  }
}
