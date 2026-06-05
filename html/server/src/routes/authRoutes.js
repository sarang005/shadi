import { Router } from 'express';
import {
  register,
  login,
  logout,
  refresh,
  getMe,
  sendOtp,
  verifyOtp,
} from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validationMiddleware.js';
import { authLimiter } from '../middlewares/rateLimiter.js';
import {
  registerValidator,
  loginValidator,
  refreshTokenValidator,
  sendOtpValidator,
  verifyOtpValidator,
} from '../validators/authValidators.js';

const router = Router();

router.use(authLimiter);

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.post('/logout', logout);
router.post('/refresh', refreshTokenValidator, validate, refresh);
router.post('/otp/send', sendOtpValidator, validate, sendOtp);
router.post('/otp/verify', verifyOtpValidator, validate, verifyOtp);
router.get('/me', authMiddleware, getMe);

export default router;
