import { body } from 'express-validator';

export const signUp = () => [
    body('email').notEmpty().withMessage('Email is required').trim(),
    body('password').notEmpty().withMessage('Password is required'),
];
