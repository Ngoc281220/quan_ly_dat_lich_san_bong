import { Navigate } from 'react-router-dom';
import { PERMISSION } from "../const";

export function AuthAdmin({ role, children }) {
    if (!role || role !== PERMISSION.ROLE_ADMIN) {
        return <Navigate to="/403" replace />;
      }
    
      return children;
}
