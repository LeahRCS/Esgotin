import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from 'wasp/client/auth';
import type { AppRole } from '../../auth/roles';
import { roleOf } from '../../auth/roles';

type Props = {
  roles: AppRole[];
  children: React.ReactNode;
};

export function RequireRole({ roles, children }: Props) {
  const { data: user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div style={{ padding: '32px', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.75rem' }}>
        Carregando credenciais do esgoto...
      </div>
    );
  }
  const r = roleOf(user ?? null);
  if (!user || !r || !roles.includes(r)) {
    return <Navigate to="/iscas" replace />;
  }
  return <>{children}</>;
}
