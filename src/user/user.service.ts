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

  register(data: UserDTO) {
    return this.user.createQueryBuilder('user')
      .insert()
      .values(data)
      .execute()
  }

  checkNIK(nik: string) {
    return this.user.createQueryBuilder('user')
      .where(`user.nik = '${nik}'`)
      .getOne()
  }

  reset() {
    return this.user.query('TRUNCATE "user"')
  }

  findOneByNIK(nik: string) {
    return this.user.findOne({
      where: { nik }
    })
  }
}
