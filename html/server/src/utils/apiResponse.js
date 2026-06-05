import { HTTP_STATUS } from '../constants/httpStatus.js';

export const sendSuccess = (res, {
  message = 'Success',
  data = null,
  statusCode = HTTP_STATUS.OK,
}) => {
  const payload = { success: true, message };
  if (data !== null) payload.data = data;
  return res.status(statusCode).json(payload);
};

export const sendError = (res, {
  message = 'Something went wrong',
  errors = [],
  statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
}) =>
  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });

export const formatUser = (user) => {
  if (!user) return null;
  const doc = user.toObject ? user.toObject() : user;
  return {
    _id: doc._id,
    id: doc._id?.toString?.() ?? doc._id,
    name: doc.name,
    email: doc.email,
    role: doc.role,
    isActive: doc.isActive,
    avatar: doc.avatar,
    membership: doc.membership || 'Free',
    profileId: doc.profileId,
    lastLogin: doc.lastLogin,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};

export const formatAuthPayload = (user, accessToken, refreshToken) => ({
  user: formatUser(user),
  accessToken,
  refreshToken,
  token: accessToken,
});
