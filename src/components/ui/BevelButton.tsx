import React from 'react';

interface BevelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  children: React.ReactNode;
  variant?: 'default' | 'toxic' | 'danger';
  fullWidth?: boolean;
}

export function BevelButton({
  icon,
  children,
  variant = 'default',
  fullWidth = false,
  className,
  style,
  ...props
}: BevelButtonProps) {
  const cls =
    variant === 'toxic'  ? 'btn-toxic'  :
    variant === 'danger' ? 'btn-danger' :
    'btn-bevel';

  return (
    <button
      className={`${cls} ${className ?? ''}`}
      style={{ width: fullWidth ? '100%' : undefined, justifyContent: fullWidth ? 'center' : undefined, ...style }}
      {...props}
    >
      {icon && (
        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
          {icon}
        </span>
      )}
      {children}
    </button>
  );
}
