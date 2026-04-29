import type { ReactNode } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  children?: ReactNode;
  requiredPermission?: string;
}

export function ProtectedRoute({ children, requiredPermission }: ProtectedRouteProps) {
  const token = useAppSelector((s) => s.auth.token);
  const permissions = useAppSelector((s) => s.auth.claims?.permissions ?? []);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredPermission && !permissions.includes(requiredPermission)) {
    return <Navigate to="/" replace />;
  }

  if (children) {
    return <>{children}</>;
  }

  return <Outlet />;
}
