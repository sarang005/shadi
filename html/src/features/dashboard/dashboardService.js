import axiosInstance from '@/services/axiosInstance';
import { API_ENDPOINTS } from '@/services/apiEndpoints';
import { unwrapApiResponse } from '@/utils/apiUtils';
import {
  DASHBOARD_STATS,
  TODAY_MATCHES,
  ACTIVITIES,
  SHORTLIST,
  COMPAT_FACTORS,
} from '@/constants/mockData';

export const fetchDashboardData = async () => {
  const [statsRes, activityRes, shortlistRes, todayRes] = await Promise.all([
    axiosInstance.get(API_ENDPOINTS.DASHBOARD.STATS),
    axiosInstance.get(API_ENDPOINTS.DASHBOARD.ACTIVITY),
    axiosInstance.get(API_ENDPOINTS.DASHBOARD.SHORTLIST),
    axiosInstance.get(API_ENDPOINTS.MATCHES.TODAY),
  ]);

  const statsData = unwrapApiResponse(statsRes.data);
  const activityData = unwrapApiResponse(activityRes.data);
  const shortlistData = unwrapApiResponse(shortlistRes.data);
  const todayData = unwrapApiResponse(todayRes.data);

  return {
    stats: statsData?.stats ?? DASHBOARD_STATS,
    todayMatches: todayData?.todayMatches ?? TODAY_MATCHES,
    activities: activityData?.activities ?? ACTIVITIES,
    shortlist: shortlistData?.shortlist ?? SHORTLIST,
    compatFactors: COMPAT_FACTORS,
    profileStrength: statsData?.profileStrength ?? 72,
    shortlistedToday: statsData?.shortlistedToday ?? 3,
  };
};

export const getMockDashboardData = () =>
  Promise.resolve({
    stats: DASHBOARD_STATS,
    todayMatches: TODAY_MATCHES,
    activities: ACTIVITIES,
    shortlist: SHORTLIST,
    compatFactors: COMPAT_FACTORS,
    profileStrength: 72,
    shortlistedToday: 3,
  });
