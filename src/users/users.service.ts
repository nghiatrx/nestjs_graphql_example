import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { NewUserInput } from './dto/new-user.input';
import { FindUserArgs } from './dto/find-user.args';
import { User } from './models/user.models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(newUser: NewUserInput): Promise<User> {
    const user = new User();
    user.name = newUser.name;
    user.email = newUser.email;
    user.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(10));
    return this.usersRepository.save(user);
  }

  async findById(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } })
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } })
  }

  async findAll(args: FindUserArgs): Promise<User[]> {
    return [] as User[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}