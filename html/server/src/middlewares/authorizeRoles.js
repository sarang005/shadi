import AppError from '../utils/AppError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { MESSAGES } from '../constants/messages.js';

export const authorizeRoles = (...roles) => (req, _res, next) => {
  if (!req.user) {
    return next(new AppError(MESSAGES.AUTH.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED));
  }

  if (!roles.includes(req.user.role)) {
    return next(new AppError(MESSAGES.AUTH.FORBIDDEN, HTTP_STATUS.FORBIDDEN));
  }

  return next();
};

export default authorizeRoles;
