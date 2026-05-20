import React from 'react';
import { applicationStatusChipClass, applicationStatusLabels } from '../../theme/tokens';

type ChipVariant = 'rejected' | 'exploited' | 'decomposing' | 'pending' | 'tag' | 'tag-danger';

interface StatusChipProps {
  label?: string;
  status?: string;   // ApplicationStatus enum value → auto-maps label & class
  variant?: ChipVariant;
}

export function StatusChip({ label, status, variant }: StatusChipProps) {
  if (status) {
    const cls   = applicationStatusChipClass[status] ?? 'chip chip-pending';
    const text  = applicationStatusLabels[status]    ?? status;
    return <span className={cls}>{text}</span>;
  }

  const cls = variant ? `chip chip-${variant}` : 'chip chip-pending';
  return <span className={cls}>{label}</span>;
}
