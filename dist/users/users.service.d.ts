import { NewUserInput } from './dto/new-user.input';
import { FindUserArgs } from './dto/find-user.args';
import { User } from './models/user.models';
import { Repository } from 'typeorm';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(newUser: NewUserInput): Promise<User>;
    findById(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findAll(args: FindUserArgs): Promise<User[]>;
    remove(id: string): Promise<boolean>;
}
