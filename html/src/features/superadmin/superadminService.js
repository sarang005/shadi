import axiosInstance from '@/services/axiosInstance';
import { API_ENDPOINTS } from '@/services/apiEndpoints';
import { unwrapApiResponse } from '@/utils/apiUtils';

export const fetchAnalytics = async () => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.SUPERADMIN.ANALYTICS);
  return unwrapApiResponse(data);
};

export const fetchAllUsers = async (params) => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.SUPERADMIN.USERS, { params });
  const payload = unwrapApiResponse(data);
  return {
    users: payload.users ?? [],
    pagination: payload.pagination ?? {},
  };
};

export const fetchAdmins = async (params) => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.SUPERADMIN.ADMINS, { params });
  const payload = unwrapApiResponse(data);
  return {
    admins: payload.admins ?? [],
    pagination: payload.pagination ?? {},
  };
};

export const createAdmin = async (payload) => {
  const { data } = await axiosInstance.post(API_ENDPOINTS.SUPERADMIN.ADMINS, payload);
  return unwrapApiResponse(data);
};

export const deleteUser = async (id) => {
  const { data } = await axiosInstance.delete(API_ENDPOINTS.SUPERADMIN.USER(id));
  return unwrapApiResponse(data);
};
