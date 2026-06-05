import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '@/constants/routes';
import { getHomeRouteForRole } from '@/constants/roles';

const RoleRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.SIGN_IN} replace />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(user?.role)) {
    return <Navigate to={getHomeRouteForRole(user?.role)} replace />;
  }

  return children;
};

export default RoleRoute;
