import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { UserDto } from '../types';
import createHttpError from 'http-errors';

export class UserService {
    constructor(private userRepository: Repository<User>) {}

    async create(payload: UserDto) {
        const existingUser = await this.findOne(payload.email);

        if (existingUser) {
            throw createHttpError(400, 'Email already exists');
        }

        return this.userRepository.save(payload);
    }
    findOne(email: string) {
        return this.userRepository.findOne({
            where: { email },
        });
    }
}
