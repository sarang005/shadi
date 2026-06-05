import { Router } from 'express';
import {
  getAnalytics,
  listAllUsers,
  listAdmins,
  createAdmin,
  updateUserRole,
  deleteUser,
  toggleAccountStatus,
} from '../controllers/superadminController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';
import { validate } from '../middlewares/validationMiddleware.js';
import {
  mongoIdValidator,
  createUserValidator,
  updateUserValidator,
  toggleStatusValidator,
} from '../validators/userValidators.js';
import { ROLES } from '../constants/roles.js';

const router = Router();

router.use(authMiddleware);
router.use(authorizeRoles(ROLES.SUPERADMIN));

router.get('/analytics', getAnalytics);
router.get('/users', listAllUsers);
router.get('/admins', listAdmins);
router.post('/admins', createUserValidator, validate, createAdmin);
router.patch('/users/:id/role', mongoIdValidator, updateUserValidator, validate, updateUserRole);
router.delete('/users/:id', mongoIdValidator, validate, deleteUser);
router.patch(
  '/users/:id/status',
  mongoIdValidator,
  toggleStatusValidator,
  validate,
  toggleAccountStatus
);

export default router;
