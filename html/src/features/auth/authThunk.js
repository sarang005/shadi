import { createAsyncThunk } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import { getStorageItem, getStorageJSON } from '@/utils/storage';
import { getApiErrorMessage } from '@/utils/apiUtils';
import * as authService from './authService';

const useMockAuth = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      return await authService.loginWithEmail(credentials);
    } catch (error) {
      if (useMockAuth && !error.response) {
        try {
          return await authService.mockLogin(credentials);
        } catch (mockErr) {
          return rejectWithValue(mockErr.message);
        }
      }
      return rejectWithValue(getApiErrorMessage(error, 'Login failed. Please try again.'));
    }
  }
);

export const sendOtpThunk = createAsyncThunk(
  'auth/sendOtp',
  async (payload, { rejectWithValue }) => {
    try {
      return await authService.sendOtp(payload);
    } catch (error) {
      if (useMockAuth && !error.response) {
        return { phone: payload.phone, maskedPhone: '+91 98765 43210' };
      }
      return rejectWithValue(getApiErrorMessage(error, 'Failed to send OTP.'));
    }
  }
);

export const verifyOtpThunk = createAsyncThunk(
  'auth/verifyOtp',
  async (payload, { rejectWithValue }) => {
    try {
      return await authService.verifyOtp(payload);
    } catch (error) {
      if (useMockAuth && !error.response) {
        return {
          accessToken: 'mock-otp-token-' + Date.now(),
          refreshToken: 'mock-refresh',
          user: {
            id: '1',
            name: 'Ananya Sharma',
            email: 'user@example.com',
            role: 'user',
            avatar: '👩',
            membership: 'Premium',
          },
        };
      }
      return rejectWithValue(getApiErrorMessage(error, 'OTP verification failed.'));
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logoutUser();
      return true;
    } catch (error) {
      if (!error.response) return true;
      return rejectWithValue(getApiErrorMessage(error, 'Logout failed.'));
    }
  }
);

export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { rejectWithValue }) => {
    const token = getStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (!token) {
      return rejectWithValue(null);
    }
    try {
      return await authService.fetchCurrentUser();
    } catch (error) {
      const user = getStorageJSON(STORAGE_KEYS.USER);
      if (user) {
        return { user };
      }
      return rejectWithValue(null);
    }
  }
);
