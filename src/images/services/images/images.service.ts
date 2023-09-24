import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { ClientConfiguration } from 'aws-sdk/clients/acm';
import IConfigService from 'src/config/interfaces/config-service.interface';
import Image from 'src/images/entities/image.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ImagesService {
  private readonly _s3Config: ClientConfiguration;

  constructor(
    @InjectRepository(Image)
    private imagesRepo: Repository<Image>,
    private readonly configService: IConfigService,
  ) {
    this._s3Config = {
      accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      region: configService.get('AWS_REGION'),
      apiVersion: '2010-12-01',
    };
  }

  async uploadPublicFile(
    dataBuffer: Buffer,
    filename: string,
  ): Promise<number> {
    const _s3 = new S3(this._s3Config);
    const uploadResult = await _s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    const newFile = await this.imagesRepo.insert({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });

    return newFile.identifiers[0].id as number;
  }
}
