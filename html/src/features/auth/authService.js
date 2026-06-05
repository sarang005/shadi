import axiosInstance from '@/services/axiosInstance';
import { API_ENDPOINTS } from '@/services/apiEndpoints';
import { unwrapApiResponse } from '@/utils/apiUtils';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import { getStorageItem } from '@/utils/storage';

export const loginWithEmail = async (credentials) => {
  const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  return unwrapApiResponse(data);
};

export const sendOtp = async (payload) => {
  const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.SEND_OTP, payload);
  return unwrapApiResponse(data);
};

export const verifyOtp = async (payload) => {
  const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.VERIFY_OTP, payload);
  return unwrapApiResponse(data);
};

export const logoutUser = async () => {
  const refreshToken = getStorageItem(STORAGE_KEYS.REFRESH_TOKEN);
  const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });
  return unwrapApiResponse(data);
};

export const fetchCurrentUser = async () => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.AUTH.ME);
  return unwrapApiResponse(data);
};

/** Demo login when VITE_USE_MOCK_AUTH=true and API is unavailable */
export const mockLogin = async ({ email, password, rememberMe }) => {
  await new Promise((r) => setTimeout(r, 400));
  if (!email?.trim()) {
    throw new Error('Email or ID is required');
  }
  return {
    accessToken: 'mock-jwt-token-' + Date.now(),
    refreshToken: 'mock-refresh-token',
    user: {
      id: '1',
      name: 'Ananya Sharma',
      email: email.trim(),
      role: 'user',
      avatar: '👩',
      membership: 'Premium',
      profileId: 'SHG1234567',
    },
    rememberMe,
  };
};
