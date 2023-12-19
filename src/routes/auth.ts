import { AuthController } from '../controllers/AuthController';
import express from 'express';

const router = express.Router();
const authController = new AuthController();

// router.use('/register', (req: Request, res: Response) =>
//     authController.register(req, res),
// );
router.use('/register', authController.register.bind(authController));

export { router as authRouter };
