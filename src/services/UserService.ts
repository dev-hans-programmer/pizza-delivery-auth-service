import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { UserDto } from '../types';

export class UserService {
    constructor(private userRepository: Repository<User>) {}

    create(payload: UserDto) {
        return this.userRepository.save(payload);
    }
}
