import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '@/constants/routes';
import { getHomeRouteForRole } from '@/constants/roles';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to={getHomeRouteForRole(user?.role)} replace />;
  }

  return children;
};

export default PublicRoute;
