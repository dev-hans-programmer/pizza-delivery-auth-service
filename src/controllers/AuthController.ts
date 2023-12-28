import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/UserService';
import * as types from '../types';
import { Logger } from 'winston';
import bcrypt from 'bcryptjs';
import { SaltRounds } from '../constants';

export class AuthController {
    constructor(
        private userService: UserService,
        private logger: Logger,
    ) {}

    async register(req: Request, res: Response, next: NextFunction) {
        // this.logger.info('New request to register a user');

        const { firstName, lastName, email, password } =
            req.body as types.UserDto;
        try {
            const hashedPassword = await bcrypt.hash(password, SaltRounds);
            const user = await this.userService.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role: 'customer',
            });
            // this.logger.info('User has been created', { id: user.id });

            res.status(201).send({ id: user.id });
        } catch (err) {
            next(err);
        }
    }
}
