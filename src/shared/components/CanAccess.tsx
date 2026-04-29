import type { ReactNode } from 'react';
import { useAppSelector } from '../../app/hooks';

interface CanAccessProps {
  permission: string;
  children: ReactNode;
}

export function CanAccess({ permission, children }: CanAccessProps) {
  const permissions = useAppSelector((s) => s.auth.claims?.permissions ?? []);

  if (!permissions.includes(permission)) {
    return null;
  }

  return <>{children}</>;
}
