export const ROUTES = {
  HOME: '/',
  SIGN_IN: '/signin',
  REGISTER: '/profile-registration',
  EDIT_PROFILE: '/edit-profile',
  DASHBOARD: '/dashboard',
  MATCHES: '/matches',
  PROFILE_VIEW: '/profile/:id',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  SUPERADMIN_DASHBOARD: '/superadmin/dashboard',
  SUPERADMIN_USERS: '/superadmin/users',
  SUPERADMIN_ADMINS: '/superadmin/admins',
  COMING_SOON: '/coming-soon',
};

export const PUBLIC_ROUTES = [ROUTES.SIGN_IN, ROUTES.REGISTER];
