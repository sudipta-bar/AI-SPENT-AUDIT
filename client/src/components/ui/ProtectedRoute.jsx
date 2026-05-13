import { Navigate, useLocation } from 'react-router-dom';
import { useAuditStore } from '../../store/useAuditStore';

export function ProtectedRoute({ children }) {
  const token = useAuditStore((state) => state.adminToken);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
