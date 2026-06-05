import { body } from 'express-validator';

export const registerValidator = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/)
    .withMessage('Password must contain an uppercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain a number'),
];

export const loginValidator = [
  body('email').trim().notEmpty().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  body('rememberMe').optional().isBoolean(),
];

export const refreshTokenValidator = [
  body('refreshToken').notEmpty().withMessage('Refresh token is required'),
];

export const sendOtpValidator = [
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('countryCode').optional().trim(),
];

export const verifyOtpValidator = [
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('otp').trim().isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
  body('countryCode').optional().trim(),
];
