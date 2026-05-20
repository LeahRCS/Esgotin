import type { AuthUser } from 'wasp/auth';

export type AppRole = 'WORKER' | 'CORPORATE' | 'ADMIN';

export function roleOf(user: AuthUser | null | undefined): AppRole | undefined {
  return user?.role as AppRole | undefined;
}

/** Destino após login conforme o papel (protótipo). */
export function homePathForRole(role: AppRole | undefined): string {
  if (role === 'ADMIN') return '/olimpo';
  if (role === 'CORPORATE') return '/lancar-isca';
  return '/iscas';
}
