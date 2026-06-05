import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '@/constants/routes';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.SIGN_IN} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
