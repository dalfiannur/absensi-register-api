import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>
  ) { }

  async register(data: UserDTO) {
    return this.user.createQueryBuilder('user')
      .insert()
      .values(data)
      .execute()
  }

  async checkNIK(nik: string) {
    return this.user.createQueryBuilder('user')
      .where('user.nik = :id', {
        nik
      })
      .getOne()
  }
}
