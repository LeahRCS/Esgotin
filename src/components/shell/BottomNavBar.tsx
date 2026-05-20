import React from 'react';
import { Link, useLocation } from 'react-router';
import type { NavItem } from '../../theme/tokens';

const fallbackMobile: NavItem[] = [
  { path: '/iscas', icon: 'dangerous', label: 'Vagas' },
  { path: '/contratos', icon: 'group', label: 'Rede' },
  { path: '/moedor', icon: 'receipt', label: 'Moedor' },
];

type Props = {
  navItems: NavItem[];
};

export function BottomNavBar({ navItems }: Props) {
  const location = useLocation();
  const items = navItems.length > 0 ? navItems.slice(0, 5) : fallbackMobile;

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '48px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        background: '#C0C0C0',
        borderTop: '2px solid #FFFFFF',
        zIndex: 50,
        padding: '0 4px',
      }}
    >
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              flex: 1,
              textDecoration: 'none',
              padding: '4px 2px',
              color: isActive ? '#106E00' : '#1A1C1C',
              ...(isActive
                ? {
                    background: 'rgba(56,254,19,0.15)',
                    borderRadius: '2px',
                  }
                : {}),
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              {item.icon}
            </span>
            <span style={{ fontSize: '0.5rem', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, textTransform: 'uppercase' }}>
              {item.label.split(' ')[0]}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
