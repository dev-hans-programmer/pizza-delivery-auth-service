import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { HttpError } from 'http-errors';
import { logger } from './config/logger';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to auth service' });
});

// error middleware
app.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: HttpError, req: Request, res: Response, next: NextFunction): void => {
        logger.error(err.message);
        res.status(err.statusCode).json({
            name: err.name,
            statusCode: err.statusCode,
            message: err.message,
            details: [],
        });
    },
);

export default app;
