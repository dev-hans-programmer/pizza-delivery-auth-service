import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { HttpError } from 'http-errors';
import { logger } from './config/logger';
import { authRouter } from './routes/auth';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to auth service' });
});

app.use('/auth', authRouter);

// error middleware
app.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: HttpError, req: Request, res: Response, next: NextFunction): void => {
        logger.error(err.message);
        res.status(err.statusCode || 500).json({
            errors: [
                {
                    type: err.name,
                    statusCode: err.statusCode,
                    msg: err.message,
                    location: '',
                    path: '',
                },
            ],
        });
    },
);

export default app;
