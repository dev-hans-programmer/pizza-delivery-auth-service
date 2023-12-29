import { body } from 'express-validator';

export const signUp = () => [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .trim()
        .isEmail()
        .withMessage('Email is not valid'),
    body('password').notEmpty().withMessage('Password is required'),
];
