import { Navigate } from 'react-router-dom';
import { PERMISSION } from '../const';

export function AuthAdmin({ user, children }) {
  if (!user) {
    return <Navigate to="/account" replace />;
  }
  if (user && user.role !== PERMISSION.ROLE_ADMIN) {
    return <Navigate to="/403" replace />;
  }

  return children;
}
