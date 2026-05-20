import React from 'react';

interface Win95WindowProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  /** Extra content rendered after the menu bar, before children */
  toolbar?: React.ReactNode;
  /** Content for the status bar at the bottom */
  statusBarItems?: Array<{ label: string; grow?: boolean }>;
  style?: React.CSSProperties;
  className?: string;
  menuItems?: string[];
}

export function Win95Window({
  title,
  icon = 'water_drop',
  children,
  toolbar,
  statusBarItems,
  style,
  className,
  menuItems = ['Arquivo', 'Editar', 'Visualizar', 'Ajuda'],
}: Win95WindowProps) {
  return (
    <div
      className={`win95-window ${className ?? ''}`}
      style={{ width: '100%', height: '100%', ...style }}
    >
      {/* ── Title Bar ── */}
      <div className="win95-titlebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            className="material-symbols-outlined filled"
            style={{ color: '#38FE13', fontSize: '14px' }}
          >
            {icon}
          </span>
          <span className="win95-titlebar-text">{title}</span>
        </div>
        <div style={{ display: 'flex', gap: '2px' }}>
          <button className="win95-titlebar-btn" title="Minimizar">_</button>
          <button className="win95-titlebar-btn" title="Maximizar">□</button>
          <button className="win95-titlebar-btn" title="Fechar">X</button>
        </div>
      </div>

      {/* ── Menu Bar ── */}
      <div className="menu-bar">
        {menuItems.map((item) => (
          <span key={item} className="menu-bar-item">
            {item}
          </span>
        ))}
      </div>

      {/* ── Toolbar (optional) ── */}
      {toolbar && (
        <div
          style={{
            padding: '4px 8px',
            borderBottom: '1px solid #808080',
            background: 'var(--color-surface-container)',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          {toolbar}
        </div>
      )}

      {/* ── Content Area ── */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>

      {/* ── Status Bar ── */}
      {statusBarItems && statusBarItems.length > 0 && (
        <div className="status-bar">
          {statusBarItems.map((item, i) => (
            <div
              key={i}
              className={`status-bar-pane ${item.grow ? 'grow' : ''}`}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
