import { body, param } from 'express-validator';
import { ALL_ROLES } from '../constants/roles.js';

export const mongoIdValidator = [param('id').isMongoId().withMessage('Invalid ID')];

export const updateProfileValidator = [
  body('name').optional().trim().isLength({ max: 100 }),
  body('avatar').optional().trim(),
  body('phone').optional().trim(),
  body('gender').optional().isIn(['male', 'female', 'other']),
  body('about').optional().isLength({ max: 2000 }),
];

export const createUserValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('role').optional().isIn(ALL_ROLES),
];

export const updateUserValidator = [
  body('name').optional().trim().isLength({ max: 100 }),
  body('email').optional().trim().isEmail().normalizeEmail(),
  body('isActive').optional().isBoolean(),
  body('role').optional().isIn(ALL_ROLES),
  body('membership').optional().trim(),
];

export const toggleStatusValidator = [
  body('isActive').isBoolean().withMessage('isActive must be a boolean'),
];
