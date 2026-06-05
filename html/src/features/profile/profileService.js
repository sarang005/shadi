import axiosInstance from '@/services/axiosInstance';
import { API_ENDPOINTS } from '@/services/apiEndpoints';
import { unwrapApiResponse } from '@/utils/apiUtils';
import { PROFILE_DETAIL } from '@/constants/mockData';

export const fetchProfileById = async (id) => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.PROFILE.DETAIL(id));
  return unwrapApiResponse(data);
};

export const getMockProfile = (id) =>
  Promise.resolve({ ...PROFILE_DETAIL, id: id || '1' });

export const updateProfile = async (payload) => {
  const { data } = await axiosInstance.put(API_ENDPOINTS.PROFILE.UPDATE, payload);
  return unwrapApiResponse(data);
};
