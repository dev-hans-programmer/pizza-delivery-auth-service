import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import * as types from '../types';

export class AuthController {
    constructor(private userService: UserService) {}

    async register(req: Request, res: Response) {
        try {
            await this.userService.create(req.body as types.UserDto);

            res.status(201).send({});
        } catch (err) {
            res.status(500).json({});
        }
    }
}
