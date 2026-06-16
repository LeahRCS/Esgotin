import React, { useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router';
import { logout } from 'wasp/client/auth';
import { useQuery } from 'wasp/client/operations';
import { getNotifications, markNotificationRead, deleteNotification, deleteAllNotifications } from 'wasp/client/operations';
import type { NavItem } from '../../theme/tokens';
import type { AppRole } from '../../auth/roles';

interface TopAppBarProps {
  userName?: string;
  userStatus?: string;
  userRole?: AppRole;
  navItems: NavItem[];
}

export function TopAppBar({ userName = 'Rato Operário', userStatus = 'desempregado', userRole, navItems }: TopAppBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: notifications = [], refetch } = useQuery(getNotifications);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleRead = async (id: number) => {
    await markNotificationRead({ id });
    refetch();
  };

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteNotification({ id });
    refetch();
  };

  const handleClearAll = async () => {
    await deleteAllNotifications();
    refetch();
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '40px',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 8px',
        background: 'linear-gradient(90deg, #000080 0%, #474EB7 100%)',
        borderBottom: '2px solid rgba(255,255,255,0.2)',
        boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.2)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span className="material-symbols-outlined filled" style={{ color: '#38FE13', fontSize: '20px' }}>
            water_drop
          </span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.25rem',
              fontWeight: 900,
              color: '#38FE13',
              textTransform: 'uppercase',
              letterSpacing: '-0.05em',
              textShadow: '2px 2px 0px rgba(0,0,0,1)',
            }}
          >
            ESGOTIN
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {location.pathname !== '/lancar-isca' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(0,0,0,0.2)',
              boxShadow: 'inset 2px 2px 0px #808080, inset -2px -2px 0px #FFFFFF',
              height: '24px',
              padding: '0 6px',
              gap: '4px',
            }}
            className="hide-mobile"
          >
            <span className="material-symbols-outlined" style={{ color: '#38FE13', fontSize: '14px' }}>
              search
            </span>
            <input
              type="text"
              placeholder="Buscar esgoto..."
              value={searchParams.get('q') || ''}
              onChange={(e) => {
                if (e.target.value) {
                  searchParams.set('q', e.target.value);
                } else {
                  searchParams.delete('q');
                }
                setSearchParams(searchParams, { replace: true });
              }}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '0.6875rem',
                color: '#FFFFFF',
                width: '140px',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            />
          </div>
        )}

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link to="/faq" style={{ textDecoration: 'none', display: 'flex' }}>
            <span className="material-symbols-outlined" title="FAQ (Leis Patronais)" style={{ color: '#38FE13', cursor: 'pointer', fontSize: '20px' }}>
              help_center
            </span>
          </Link>
          
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span 
              className="material-symbols-outlined" 
              style={{ color: notifOpen ? '#FFFFFF' : '#38FE13', cursor: 'pointer', fontSize: '20px' }}
              onClick={() => { setNotifOpen(!notifOpen); setMenuOpen(false); }}
            >
              notifications
            </span>
          {unreadCount > 0 && (
            <div style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#BA1A1A',
              color: '#FFFFFF',
              fontSize: '0.5rem',
              fontWeight: 900,
              width: '14px',
              height: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              pointerEvents: 'none'
            }}>
              {unreadCount}
            </div>
          )}

          {notifOpen && (
            <div style={{
              position: 'absolute',
              top: '32px',
              right: '-10px',
              width: '280px',
              maxHeight: '400px',
              overflowY: 'auto',
              background: '#EEEEEE',
              border: '2px solid #808080',
              boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.4)',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              zIndex: 100
            }}>
              <h3 style={{ margin: '0 0 8px 0', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.75rem', color: '#1A1C1C', textTransform: 'uppercase' }}>Notificações Tóxicas</h3>
              {notifications.length === 0 && (
                <div style={{ padding: '16px', textAlign: 'center', fontSize: '0.6875rem', color: '#808080' }}>
                  Nenhum aviso do além.
                </div>
              )}
              {notifications.map(n => (
                <div 
                  key={n.id} 
                  style={{ 
                    padding: '8px', 
                    background: n.isRead ? '#DADADA' : '#FFFFFF', 
                    border: '1px solid #808080',
                    cursor: n.isRead ? 'default' : 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                  onClick={() => !n.isRead && handleRead(n.id)}
                >
                  <span 
                    className="material-symbols-outlined" 
                    style={{ position: 'absolute', top: '4px', right: '4px', fontSize: '14px', cursor: 'pointer', color: '#BA1A1A' }}
                    onClick={(e) => handleDelete(n.id, e)}
                  >
                    close
                  </span>
                  <span style={{ fontSize: '0.625rem', fontWeight: n.isRead ? 400 : 700, color: '#1A1C1C', fontFamily: "'Space Grotesk', sans-serif", paddingRight: '16px' }}>
                    {n.message}
                  </span>
                  <span style={{ fontSize: '0.5rem', color: '#6E7979' }}>
                    {new Date(n.createdAt).toLocaleString('pt-BR')}
                  </span>
                </div>
              ))}
              {notifications.length > 0 && (
                <button
                  type="button"
                  style={{
                    marginTop: '4px',
                    fontSize: '0.625rem',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    padding: '4px 8px',
                    background: '#BA1A1A',
                    border: 'none',
                    boxShadow: 'inset 2px 2px 0px #FFB4AB, inset -2px -2px 0px #690005',
                    color: '#FFFFFF',
                    cursor: 'pointer'
                  }}
                  onClick={handleClearAll}
                >
                  Limpar Lixo
                </button>
              )}
            </div>
          )}
        </div>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <span 
            className="material-symbols-outlined" 
            style={{ color: menuOpen ? '#FFFFFF' : 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '20px' }}
            onClick={() => { setMenuOpen(!menuOpen); setNotifOpen(false); }}
          >
            settings
          </span>
          
          {menuOpen && (
            <div style={{
              position: 'absolute',
              top: '32px',
              right: '-10px',
              width: '200px',
              background: '#EEEEEE',
              border: '2px solid #808080',
              boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.4)',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              zIndex: 100
            }}>
              <div>
                <p style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.75rem', color: '#1A1C1C' }}>{userName}</p>
                <p style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.625rem', color: '#000080', marginTop: '2px' }}>STATUS: {userStatus}</p>
                {userRole && <p style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.625rem', color: '#474EB7', marginTop: '2px' }}>PAPEL: {userRole}</p>}
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid #808080', borderBottom: '1px solid #FFFFFF', width: '100%', margin: '4px 0' }} />
              <button
                type="button"
                style={{
                  fontSize: '0.6875rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  justifyContent: 'center',
                  padding: '6px 8px',
                  background: '#DADADA',
                  border: 'none',
                  boxShadow: 'inset 2px 2px 0px #FFFFFF, inset -2px -2px 0px #808080',
                  color: '#1A1C1C',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setMenuOpen(false);
                  void logout();
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>logout</span>
                Sair do Sistema
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .hide-mobile { display: flex; }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}
