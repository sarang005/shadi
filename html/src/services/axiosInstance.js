import axios from 'axios';
import { API_ENDPOINTS } from './apiEndpoints';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import { getStorageItem, removeStorageItem } from '@/utils/storage';

const baseURL = import.meta.env.VITE_API_BASE_URL;
const timeout = Number(import.meta.env.VITE_API_TIMEOUT) || 30000;

const axiosInstance = axios.create({
  baseURL,
  timeout,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

let storeRef = null;
let isRefreshing = false;
let failedQueue = [];

export const setAxiosStore = (store) => {
  storeRef = store;
};

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const getToken = () => {
  if (storeRef) {
    const state = storeRef.getState();
    return state?.auth?.accessToken;
  }
  return getStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
};

export const setupInterceptors = () => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axiosInstance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = getStorageItem(STORAGE_KEYS.REFRESH_TOKEN);

        if (refreshToken) {
          try {
            const { data } = await axios.post(
              `${baseURL}${API_ENDPOINTS.AUTH.REFRESH}`,
              { refreshToken }
            );
            const payload = data?.success && data?.data ? data.data : data;
            const newToken = payload?.accessToken ?? payload?.token;
            if (newToken && storeRef) {
              const { setTokens } = await import('@/features/auth/authSlice');
              storeRef.dispatch(
                setTokens({
                  accessToken: newToken,
                  refreshToken: payload?.refreshToken ?? refreshToken,
                })
              );
            }
            processQueue(null, newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            processQueue(refreshError, null);
            handleLogout();
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }

        handleLogout();
      }

      return Promise.reject(error);
    }
  );
};

const handleLogout = () => {
  removeStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
  removeStorageItem(STORAGE_KEYS.REFRESH_TOKEN);
  removeStorageItem(STORAGE_KEYS.USER);
  if (storeRef) {
    import('@/features/auth/authSlice').then(({ logout }) => {
      storeRef.dispatch(logout());
    });
  }
  if (window.location.pathname !== '/signin') {
    window.location.href = '/signin';
  }
};

export default axiosInstance;
