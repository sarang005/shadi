export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    SEND_OTP: '/auth/otp/send',
    VERIFY_OTP: '/auth/otp/verify',
    ME: '/auth/me',
    REGISTER: '/auth/register',
  },
  MATCHES: {
    LIST: '/matches',
    TODAY: '/matches/today',
    DETAIL: (id) => `/matches/${id}`,
    INTEREST: (id) => `/matches/${id}/interest`,
    SHORTLIST: (id) => `/matches/${id}/shortlist`,
  },
  DASHBOARD: {
    STATS: '/dashboard/stats',
    ACTIVITY: '/dashboard/activity',
    SHORTLIST: '/dashboard/shortlist',
  },
  PROFILE: {
    REGISTER: '/profile',
    UPDATE: '/profile',
    DETAIL: (id) => `/profile/${id}`,
    ME: '/user/profile',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    USER: (id) => `/admin/users/${id}`,
    USER_STATUS: (id) => `/admin/users/${id}/status`,
  },
  SUPERADMIN: {
    ANALYTICS: '/superadmin/analytics',
    USERS: '/superadmin/users',
    ADMINS: '/superadmin/admins',
    USER_ROLE: (id) => `/superadmin/users/${id}/role`,
    USER_STATUS: (id) => `/superadmin/users/${id}/status`,
    USER: (id) => `/superadmin/users/${id}`,
  },
};
