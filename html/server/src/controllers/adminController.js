import adminService from "../services/adminService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess, formatUser } from "../utils/apiResponse.js";
import { MESSAGES } from "../constants/messages.js";

export const getDashboard = asyncHandler(async (req, res) => {
  const stats = await adminService.getDashboardStats();
  sendSuccess(res, { message: "Admin dashboard fetched", data: stats });
});

export const listUsers = asyncHandler(async (req, res) => {
  const { users, pagination } = await adminService.listUsers(req.query);
  sendSuccess(res, {
    message: MESSAGES.USER.LIST_FETCHED,
    data: { users: users.map(formatUser), pagination },
  });
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await adminService.getUserById(req.params.id);
  sendSuccess(res, {
    message: MESSAGES.USER.FETCHED,
    data: { user: formatUser(user) },
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await adminService.updateUser(req.params.id, req.body);
  sendSuccess(res, {
    message: MESSAGES.USER.UPDATED,
    data: { user: formatUser(user) },
  });
});

/**
 * @description Toggle user status
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise<void>}
 */
export const toggleUserStatus = asyncHandler(async (req, res) => {
  const user = await adminService.toggleUserStatus(
    req.params.id,
    req.body.isActive,
  );

  sendSuccess(res, {
    message: MESSAGES.USER.UPDATED,
    data: { user: formatUser(user) },
  });
});
