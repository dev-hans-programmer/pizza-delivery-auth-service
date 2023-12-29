import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const customValidationResult = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        const errors = result
            .array()
            .map((err) => ({ ...err, value: undefined }));
        return res.status(400).json({ errors });
    }

    next();
};
