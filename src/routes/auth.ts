/* eslint-disable @typescript-eslint/no-misused-promises */
import { UserService } from '../services/UserService';
import { AuthController } from '../controllers/AuthController';
import express, { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';

const router = express.Router();
const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);
const authController = new AuthController(userService);

router.use('/register', (req: Request, res: Response) =>
    authController.register(req, res),
);
// router.use('/register', authController.register.bind(authController));

export { router as authRouter };
