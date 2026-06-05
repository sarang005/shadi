import { Router } from 'express';
import { getMyProfile, updateMyProfile } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';
import { validate } from '../middlewares/validationMiddleware.js';
import { updateProfileValidator } from '../validators/userValidators.js';
import { ROLES, ADMIN_ROLES } from '../constants/roles.js';

const router = Router();

router.use(authMiddleware);
router.use(authorizeRoles(ROLES.USER, ...ADMIN_ROLES));

router.get('/profile', getMyProfile);
router.put('/profile', updateProfileValidator, validate, updateMyProfile);

export default router;
