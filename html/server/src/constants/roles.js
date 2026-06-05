export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin',
};

export const ALL_ROLES = Object.values(ROLES);

export const ADMIN_ROLES = [ROLES.ADMIN, ROLES.SUPERADMIN];
