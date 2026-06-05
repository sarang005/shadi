import { getHomeRouteForRole } from '@/constants/roles';

export const getPostLoginRoute = (user, fromPath) => {
  const home = getHomeRouteForRole(user?.role);
  if (!fromPath || fromPath === '/' || fromPath === '/signin') {
    return home;
  }
  return fromPath;
};
