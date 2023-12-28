import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/UserService';
import * as types from '../types';
import { Logger } from 'winston';

export class AuthController {
    constructor(
        private userService: UserService,
        private logger: Logger,
    ) {}

    async register(req: Request, res: Response, next: NextFunction) {
        this.logger.info('New request to register a user');
        try {
            const user = await this.userService.create({
                ...req.body,
                role: 'customer',
            } as types.UserDto);
            this.logger.info('User has been created', { id: user.id });

            res.status(201).send({ id: user.id });
        } catch (err) {
            next(err);
        }
    }
}
