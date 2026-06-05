export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin',
};

export const ADMIN_ROLES = [ROLES.ADMIN, ROLES.SUPERADMIN];

export const getHomeRouteForRole = (role) => {
  switch (role) {
    case ROLES.SUPERADMIN:
      return '/superadmin/dashboard';
    case ROLES.ADMIN:
      return '/admin/dashboard';
    default:
      return '/dashboard';
  }
};
