import { verifyAccessToken } from '../utils/jwtUtils.js';
import userRepository from '../repositories/userRepository.js';
import AppError from '../utils/AppError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { MESSAGES } from '../constants/messages.js';
import asyncHandler from '../utils/asyncHandler.js';

export const authMiddleware = asyncHandler(async (req, _res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    throw new AppError(MESSAGES.AUTH.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
  }

  try {
    const decoded = verifyAccessToken(token);
    const user = await userRepository.findById(decoded.id);

    if (!user) {
      throw new AppError(MESSAGES.AUTH.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
    }

    if (!user.isActive) {
      throw new AppError(MESSAGES.AUTH.ACCOUNT_INACTIVE, HTTP_STATUS.FORBIDDEN);
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    if (error.isOperational) throw error;
    throw new AppError(MESSAGES.AUTH.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
  }
});

export default authMiddleware;
