import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Loading from './Loading';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <Loading message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={user?.role === 'faculty' ? '/faculty' : '/student'} replace />;
  }

  return children;
};

export default ProtectedRoute;
