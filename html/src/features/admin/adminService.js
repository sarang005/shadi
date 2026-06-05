import axiosInstance from '@/services/axiosInstance';
import { API_ENDPOINTS } from '@/services/apiEndpoints';
import { unwrapApiResponse } from '@/utils/apiUtils';

export const fetchAdminDashboard = async () => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN.DASHBOARD);
  return unwrapApiResponse(data);
};

export const fetchUsers = async (params) => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN.USERS, { params });
  const payload = unwrapApiResponse(data);
  return {
    users: payload.users ?? [],
    pagination: payload.pagination ?? {},
  };
};

export const updateUserStatus = async (id, isActive) => {
  const { data } = await axiosInstance.patch(API_ENDPOINTS.ADMIN.USER_STATUS(id), { isActive });
  return unwrapApiResponse(data);
};
