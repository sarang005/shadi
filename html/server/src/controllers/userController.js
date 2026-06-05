import userService from '../services/userService.js';
import profileService from '../services/profileService.js';
import dashboardService from '../services/dashboardService.js';
import matchesService from '../services/matchesService.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, formatUser } from '../utils/apiResponse.js';
import { MESSAGES } from '../constants/messages.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const getMyProfile = asyncHandler(async (req, res) => {
  const result = await userService.getOwnProfile(req.user._id);
  sendSuccess(res, {
    message: MESSAGES.USER.PROFILE_FETCHED,
    data: { user: formatUser(result.user), profile: result.profile },
  });
});

export const updateMyProfile = asyncHandler(async (req, res) => {
  const result = await userService.updateOwnProfile(req.user._id, req.body);
  sendSuccess(res, {
    message: MESSAGES.USER.PROFILE_UPDATED,
    data: { user: formatUser(result.user), profile: result.profile },
  });
});

export const registerProfile = asyncHandler(async (req, res) => {
  const result = await profileService.registerProfile(req.user._id, req.body);
  sendSuccess(res, {
    message: MESSAGES.USER.PROFILE_UPDATED,
    data: result,
    statusCode: HTTP_STATUS.CREATED,
  });
});

export const getProfileById = asyncHandler(async (req, res) => {
  const profile = await profileService.getProfileById(req.params.id);
  sendSuccess(res, {
    message: MESSAGES.USER.PROFILE_FETCHED,
    data: profile,
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const profile = await profileService.updateOwnProfile(req.user._id, req.body);
  sendSuccess(res, {
    message: MESSAGES.USER.PROFILE_UPDATED,
    data: profile,
  });
});

export const getDashboardStats = asyncHandler(async (req, res) => {
  const data = await dashboardService.getStats(req.user._id);
  sendSuccess(res, { message: 'Dashboard stats fetched', data });
});

export const getDashboardActivity = asyncHandler(async (req, res) => {
  const data = await dashboardService.getActivity();
  sendSuccess(res, { message: 'Activity fetched', data });
});

export const getDashboardShortlist = asyncHandler(async (req, res) => {
  const data = await dashboardService.getShortlist();
  sendSuccess(res, { message: 'Shortlist fetched', data });
});

export const getTodayMatches = asyncHandler(async (req, res) => {
  const data = await dashboardService.getTodayMatches();
  sendSuccess(res, { message: 'Today matches fetched', data });
});

export const listMatches = asyncHandler(async (req, res) => {
  const data = await matchesService.listMatches(req.query);
  sendSuccess(res, { message: 'Matches fetched', data });
});

export const getMatchById = asyncHandler(async (req, res) => {
  const data = await matchesService.getMatchById(req.params.id);
  sendSuccess(res, { message: 'Match fetched', data });
});

export const toggleInterest = asyncHandler(async (req, res) => {
  const data = await matchesService.toggleInterest(req.params.id, req.body.liked);
  sendSuccess(res, { message: 'Interest updated', data });
});

export const toggleShortlist = asyncHandler(async (req, res) => {
  const data = await matchesService.toggleShortlist(req.params.id, req.body.shortlisted);
  sendSuccess(res, { message: 'Shortlist updated', data });
});
