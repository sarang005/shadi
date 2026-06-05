import superadminService from '../services/superadminService.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, formatUser } from '../utils/apiResponse.js';
import { MESSAGES } from '../constants/messages.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const getAnalytics = asyncHandler(async (req, res) => {
  const data = await superadminService.getSystemAnalytics();
  sendSuccess(res, { message: 'System analytics fetched', data });
});

export const listAllUsers = asyncHandler(async (req, res) => {
  const { users, pagination } = await superadminService.listAllUsers(req.query);
  sendSuccess(res, {
    message: MESSAGES.USER.LIST_FETCHED,
    data: { users: users.map(formatUser), pagination },
  });
});

export const listAdmins = asyncHandler(async (req, res) => {
  const { users, pagination } = await superadminService.listAdmins(req.query);
  sendSuccess(res, {
    message: 'Admins fetched',
    data: { admins: users.map(formatUser), pagination },
  });
});

export const createAdmin = asyncHandler(async (req, res) => {
  const user = await superadminService.createAdmin(req.body, req.user._id);
  sendSuccess(res, {
    message: MESSAGES.USER.CREATED,
    data: { user: formatUser(user) },
    statusCode: HTTP_STATUS.CREATED,
  });
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const user = await superadminService.updateUserRole(
    req.params.id,
    req.body.role,
    req.user.role
  );
  sendSuccess(res, {
    message: MESSAGES.USER.UPDATED,
    data: { user: formatUser(user) },
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  await superadminService.deleteUser(req.params.id, req.user._id);
  sendSuccess(res, { message: MESSAGES.USER.DELETED, data: null });
});

export const toggleAccountStatus = asyncHandler(async (req, res) => {
  const user = await superadminService.toggleAccountStatus(
    req.params.id,
    req.body.isActive
  );
  sendSuccess(res, {
    message: MESSAGES.USER.UPDATED,
    data: { user: formatUser(user) },
  });
});
