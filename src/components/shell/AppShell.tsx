import React from 'react';
import { useAuth } from 'wasp/client/auth';
import { roleOf } from '../../auth/roles';
import { navItemsForRole } from '../../theme/tokens';
import { TopAppBar } from './TopAppBar';
import { BottomNavBar } from './BottomNavBar';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { data: user } = useAuth();
  const navItems = navItemsForRole(roleOf(user ?? null));
  const displayName = user?.displayName ?? user?.username ?? 'Visitante';
  const userStatus = user?.status ?? '—';
  const userRole = roleOf(user ?? null);

  return (
    <div className="app-layout">
      <TopAppBar userName={displayName} userStatus={userStatus} userRole={userRole} navItems={navItems} />

      <div className="app-body">
        <main className="main-content teal-desktop" style={{ position: 'relative' }}>
          <div className="pixel-grid-overlay" />
          {children}
        </main>
      </div>

      <BottomNavBar navItems={navItems} />
    </div>
  );
}
