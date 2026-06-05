import { validationResult } from 'express-validator';
import { sendError } from '../utils/apiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { MESSAGES } from '../constants/messages.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return sendError(res, {
      message: MESSAGES.GENERAL.VALIDATION_FAILED,
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
      statusCode: HTTP_STATUS.UNPROCESSABLE,
    });
  }

  return next();
};

export default validate;
