import rateLimit from 'express-rate-limit';
import env from '../config/env.js';
import { sendError } from '../utils/apiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const globalLimiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) =>
    sendError(res, {
      message: 'Too many requests, please try again later',
      statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
    }),
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many auth attempts' },
  standardHeaders: true,
  legacyHeaders: false,
});

export default globalLimiter;
