import mongoose from 'mongoose';
import { sendError } from '../utils/apiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { MESSAGES } from '../constants/messages.js';
import env from '../config/env.js';
import logger from '../config/logger.js';

export const notFound = (req, res) =>
  sendError(res, {
    message: `Route ${req.originalUrl} not found`,
    statusCode: HTTP_STATUS.NOT_FOUND,
  });

export const errorHandler = (err, req, res, _next) => {
  let statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = err.message || MESSAGES.GENERAL.SERVER_ERROR;
  let errors = err.errors || [];

  if (err.name === 'ValidationError' && err instanceof mongoose.Error.ValidationError) {
    statusCode = HTTP_STATUS.UNPROCESSABLE;
    message = MESSAGES.GENERAL.VALIDATION_FAILED;
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  if (err.code === 11000) {
    statusCode = HTTP_STATUS.CONFLICT;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `${field} already exists`;
    errors = [{ field, message }];
  }

  if (err.name === 'CastError') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = 'Invalid resource ID';
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = MESSAGES.AUTH.UNAUTHORIZED;
  }

  if (!err.isOperational) {
    logger.error(err.stack || err.message);
    if (env.isProduction) {
      message = MESSAGES.GENERAL.SERVER_ERROR;
    }
  }

  return sendError(res, { message, errors, statusCode });
};
