import { Injectable } from '@nestjs/common';
import CreateUserDto from '../../..//users/dto/create-user.dto';
import { User } from '../../..//users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BcryptService } from 'src/bcrypt/services/bcrypt/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private bcryptService: BcryptService,
  ) {}

  async findOne(email: string): Promise<User | null> {
    return this.usersRepo.findOne({
      where: {
        email: email,
      },
    });
  }

  async findOneById(userId: number): Promise<User | null> {
    return this.usersRepo.findOneBy({
      id: userId,
    });
  }

  async create(user: CreateUserDto): Promise<number> {
    user.password = this.bcryptService.encodePassword(user.password);
    const createdUser = await this.usersRepo.insert({
      ...user,
      balance: 0,
    });
    return createdUser.identifiers[0].id;
  }
}
