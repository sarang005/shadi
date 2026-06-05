import { createSlice } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import {
  getStorageItem,
  getStorageJSON,
  removeStorageItem,
  setStorageItem,
  setStorageJSON,
} from '@/utils/storage';
import {
  loginUser,
  logoutUser,
  restoreSession,
  sendOtpThunk,
  verifyOtpThunk,
} from './authThunk';

const initialState = {
  user: getStorageJSON(STORAGE_KEYS.USER),
  accessToken: getStorageItem(STORAGE_KEYS.ACCESS_TOKEN),
  refreshToken: getStorageItem(STORAGE_KEYS.REFRESH_TOKEN),
  isAuthenticated: !!getStorageItem(STORAGE_KEYS.ACCESS_TOKEN),
  authReady: false,
  loading: false,
  otpLoading: false,
  error: null,
  otpSent: false,
  maskedPhone: null,
};

const persistAuth = (state, rememberMe = true) => {
  if (state.accessToken) {
    setStorageItem(STORAGE_KEYS.ACCESS_TOKEN, state.accessToken);
  }
  if (state.refreshToken) {
    setStorageItem(STORAGE_KEYS.REFRESH_TOKEN, state.refreshToken);
  }
  if (state.user) {
    setStorageJSON(STORAGE_KEYS.USER, state.user);
  }
  if (rememberMe !== undefined) {
    setStorageItem(STORAGE_KEYS.REMEMBER_ME, String(rememberMe));
  }
};

const clearPersistedAuth = () => {
  removeStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
  removeStorageItem(STORAGE_KEYS.REFRESH_TOKEN);
  removeStorageItem(STORAGE_KEYS.USER);
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken ?? state.refreshToken;
      state.isAuthenticated = !!action.payload.accessToken;
      persistAuth(state);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.otpSent = false;
      state.maskedPhone = null;
      state.error = null;
      clearPersistedAuth();
    },
    resetOtpState: (state) => {
      state.otpSent = false;
      state.maskedPhone = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken ?? action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        persistAuth(state, action.payload.rememberMe ?? action.meta.arg?.rememberMe);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendOtpThunk.pending, (state) => {
        state.otpLoading = true;
        state.error = null;
      })
      .addCase(sendOtpThunk.fulfilled, (state, action) => {
        state.otpLoading = false;
        state.otpSent = true;
        state.maskedPhone = action.payload.maskedPhone ?? '+91 98765 43210';
      })
      .addCase(sendOtpThunk.rejected, (state, action) => {
        state.otpLoading = false;
        state.error = action.payload;
      })
      .addCase(verifyOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken ?? action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        persistAuth(state);
      })
      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        clearPersistedAuth();
      })
      .addCase(restoreSession.pending, (state) => {
        state.authReady = false;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        if (action.payload?.user) {
          state.user = action.payload.user;
        }
        state.isAuthenticated = !!state.accessToken;
        state.authReady = true;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        clearPersistedAuth();
        state.authReady = true;
      });
  },
});

export const { clearAuthError, setTokens, logout, resetOtpState } = authSlice.actions;
export default authSlice.reducer;
