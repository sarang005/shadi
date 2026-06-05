import authService from '../services/authService.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { formatUser } from '../utils/apiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { MESSAGES } from '../constants/messages.js';

export const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  sendSuccess(res, {
    message: MESSAGES.AUTH.REGISTER_SUCCESS,
    data: result,
    statusCode: HTTP_STATUS.CREATED,
  });
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body, {
    userAgent: req.headers['user-agent'],
    ipAddress: req.ip,
  });
  sendSuccess(res, {
    message: MESSAGES.AUTH.LOGIN_SUCCESS,
    data: result,
  });
});

export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.body.refreshToken;
  await authService.logout(refreshToken);
  sendSuccess(res, { message: MESSAGES.AUTH.LOGOUT_SUCCESS, data: null });
});

export const refresh = asyncHandler(async (req, res) => {
  const token = req.body.refreshToken;
  const result = await authService.refreshToken(token);
  sendSuccess(res, {
    message: MESSAGES.AUTH.TOKEN_REFRESHED,
    data: result,
  });
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user._id);
  sendSuccess(res, {
    message: MESSAGES.USER.FETCHED,
    data: { user: formatUser(user) },
  });
});

export const sendOtp = asyncHandler(async (req, res) => {
  const result = await authService.sendOtp(req.body);
  sendSuccess(res, {
    message: MESSAGES.AUTH.OTP_SENT,
    data: result,
  });
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const result = await authService.verifyOtp(req.body);
  sendSuccess(res, {
    message: MESSAGES.AUTH.OTP_VERIFIED,
    data: result,
  });
});
