import { Injectable } from '@nestjs/common';
import CreateUserDto from '../../..//users/dto/create-user.dto';
import { User } from '../../..//users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async findOne(email: string): Promise<User | null> {
    return this.usersRepo.findOne({
      where: {
        email: email,
      },
      select: {
        password: true,
        email: true,
        name: true,
        id: true,
        role: true,
      },
    });
  }

  async findOneById(userId: number): Promise<User | null> {
    return this.usersRepo.findOneBy({
      id: userId,
    });
  }

  async create(user: CreateUserDto): Promise<number> {
    const createdUser = await this.usersRepo.insert({
      ...user,
      balance: 0,
    });
    return createdUser.identifiers[0].id;
  }
}
