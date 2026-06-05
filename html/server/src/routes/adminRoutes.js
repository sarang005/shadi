import { Router } from 'express';
import {
  getDashboard,
  listUsers,
  getUser,
  updateUser,
  toggleUserStatus,
} from '../controllers/adminController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';
import { validate } from '../middlewares/validationMiddleware.js';
import {
  mongoIdValidator,
  updateUserValidator,
  toggleStatusValidator,
} from '../validators/userValidators.js';
import { ROLES } from '../constants/roles.js';

const router = Router();

router.use(authMiddleware);
router.use(authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN));

router.get('/dashboard', getDashboard);
router.get('/users', listUsers);
router.get('/users/:id', mongoIdValidator, validate, getUser);
router.put('/users/:id', mongoIdValidator, updateUserValidator, validate, updateUser);
router.patch(
  '/users/:id/status',
  mongoIdValidator,
  toggleStatusValidator,
  validate,
  toggleUserStatus
);

export default router;
