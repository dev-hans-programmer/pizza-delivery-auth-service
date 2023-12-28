/* eslint-disable @typescript-eslint/no-misused-promises */
import { UserService } from '../services/UserService';
import { AuthController } from '../controllers/AuthController';
import express, { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';
import { logger } from '../config/logger';

const router = express.Router();
const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);
const authController = new AuthController(userService, logger);

router.use('/register', (req: Request, res: Response, next: NextFunction) =>
    authController.register(req, res, next),
);
// router.use('/register', authController.register.bind(authController));

export { router as authRouter };
