import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '@/constants/routes';
import { getHomeRouteForRole } from '@/constants/roles';

const RedirectHome = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.SIGN_IN} replace />;
  }

  return <Navigate to={getHomeRouteForRole(user?.role)} replace />;
};

export default RedirectHome;
