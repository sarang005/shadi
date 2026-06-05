import { Router } from 'express';
import {
  getDashboardStats,
  getDashboardActivity,
  getDashboardShortlist,
  getTodayMatches,
  listMatches,
  getMatchById,
  toggleInterest,
  toggleShortlist,
  registerProfile,
  getProfileById,
  updateProfile,
} from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';
import { validate } from '../middlewares/validationMiddleware.js';
import { updateProfileValidator } from '../validators/userValidators.js';
import { ROLES, ADMIN_ROLES } from '../constants/roles.js';

const router = Router();

router.use(authMiddleware);
router.use(authorizeRoles(ROLES.USER, ...ADMIN_ROLES));

router.get('/dashboard/stats', getDashboardStats);
router.get('/dashboard/activity', getDashboardActivity);
router.get('/dashboard/shortlist', getDashboardShortlist);
router.get('/matches/today', getTodayMatches);
router.get('/matches', listMatches);
router.get('/matches/:id', getMatchById);
router.post('/matches/:id/interest', toggleInterest);
router.post('/matches/:id/shortlist', toggleShortlist);
router.post('/profile', registerProfile);
router.put('/profile', updateProfileValidator, validate, updateProfile);
router.get('/profile/:id', getProfileById);

export default router;
