import axiosInstance from '@/services/axiosInstance';
import { API_ENDPOINTS } from '@/services/apiEndpoints';
import { unwrapApiResponse } from '@/utils/apiUtils';
import { MATCH_PROFILES } from '@/constants/mockData';

export const fetchMatches = async (params) => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.MATCHES.LIST, { params });
  const payload = unwrapApiResponse(data);
  const pagination = payload.pagination || {};

  return {
    profiles: payload.profiles ?? [],
    totalCount: payload.totalCount ?? 0,
    page: pagination.page ?? payload.page ?? 1,
    totalPages: pagination.totalPages ?? payload.totalPages ?? 1,
  };
};

export const getMockMatches = () =>
  Promise.resolve({
    profiles: MATCH_PROFILES,
    totalCount: 124840,
    page: 1,
    totalPages: 48,
  });

export const toggleLike = async (id, liked) => {
  const { data } = await axiosInstance.post(API_ENDPOINTS.MATCHES.INTEREST(id), { liked });
  return unwrapApiResponse(data);
};
