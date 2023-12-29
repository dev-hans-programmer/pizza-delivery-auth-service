import { body } from 'express-validator';

export const signUp = () => [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty(),
];
