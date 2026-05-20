import React from 'react';

interface ProgressBar95Props {
  /** 0–100 */
  value: number;
  label?: string;
  valueLabel?: string;
  /** Number of fill segments to render */
  segments?: number;
}

export function ProgressBar95({
  value,
  label,
  valueLabel,
  segments = 20,
}: ProgressBar95Props) {
  return (
    <div>
      {(label || valueLabel !== undefined) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.625rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            color: '#000080',
            marginBottom: '2px',
          }}
        >
          {label && <span>{label}</span>}
          {valueLabel !== undefined && <span>{valueLabel}</span>}
        </div>
      )}
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        >
          {Array.from({ length: segments }).map((_, i) => (
            <div key={i} className="progress-bar-fill-segment" />
          ))}
        </div>
      </div>
    </div>
  );
}
