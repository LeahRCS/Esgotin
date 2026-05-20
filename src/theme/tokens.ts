/**
 * ESGOTIN — Design Tokens (TypeScript)
 * Mirrors toxicBureaucracy.css for use in JS/TSX components.
 * "The Industrial Ghost in the Machine"
 */

import type { AppRole } from '../auth/roles';

// ─── Color Palette ────────────────────────────────────────
export const colors = {
  // Surface Hierarchy
  surface:                  '#FAF9F9',
  surfaceBright:            '#FAF9F9',
  surfaceDim:               '#DADADA',
  surfaceContainerLowest:   '#FFFFFF',
  surfaceContainerLow:      '#F4F3F3',
  surfaceContainer:         '#EEEEEE',
  surfaceContainerHigh:     '#E8E8E8',
  surfaceContainerHighest:  '#E3E2E2',

  // Primary — Corporate Blue
  primary:              '#474EB7',
  onPrimary:            '#FFFFFF',
  primaryContainer:     '#6068D2',
  onPrimaryFixed:       '#00006E',

  // Secondary — TOXIC NEON GREEN
  secondary:            '#106E00',
  onSecondary:          '#FFFFFF',
  secondaryContainer:   '#38FE13',
  onSecondaryContainer: '#107100',
  secondaryFixed:       '#79FF5B',

  // Tertiary — Teal Desktop
  tertiary:             '#006565',
  tertiaryContainer:    '#008080',

  // On-Surface
  onSurface:            '#1A1C1C',
  onSurfaceVariant:     '#3E4949',
  onBackground:         '#1A1C1C',
  outline:              '#6E7979',
  outlineVariant:       '#BDC9C8',

  // Error
  error:                '#BA1A1A',
  onError:              '#FFFFFF',
  errorContainer:       '#FFDAD6',
} as const;

// ─── Typography ───────────────────────────────────────────
export const fonts = {
  headline: "'Space Grotesk', sans-serif",
  body:     "'Inter', sans-serif",
  label:    "'Space Grotesk', sans-serif",
  mono:     "'Courier New', Courier, monospace",
} as const;

// ─── Bevel Shadows ────────────────────────────────────────
export const bevels = {
  outset:     'inset 2px 2px 0px #FFFFFF, inset -2px -2px 0px #808080',
  outsetDeep: 'inset 2px 2px 0px #FFFFFF, inset -2px -2px 0px #808080, 2px 2px 0px 0px rgba(0,0,0,0.2)',
  inset:      'inset 2px 2px 0px #808080, inset -2px -2px 0px #FFFFFF',
  active:     'inset 2px 2px 0px #000000, inset -1px -1px 0px #FFFFFF',
} as const;

// ─── Application Status Labels ────────────────────────────
export const applicationStatusLabels: Record<string, string> = {
  PENDING:     'PENDENTE',
  EXPLOITED:   'EXPLORADO',
  REJECTED:    'REJEITADO_COM_SUCESSO',
  DECOMPOSING: 'EM_DECOMPOSICAO',
};

export const applicationStatusChipClass: Record<string, string> = {
  PENDING:     'chip chip-pending',
  EXPLOITED:   'chip chip-exploited',
  REJECTED:    'chip chip-rejected',
  DECOMPOSING: 'chip chip-decomposing',
};

// ─── Job Status Labels ────────────────────────────────────
export const jobStatusLabels: Record<string, string> = {
  PENDING_MODERATION: 'AGUARDANDO_LAMA',
  ACTIVE:             'ATIVA',
  FILLED:             'PREENCHIDA',
  DECOMPOSING:        'DECOMPONDO',
  CLOSED:             'FECHADA',
};

export type NavItem = {
  path: string;
  icon: string;
  label: string;
};

/** Navegação por papel: operário vê feed; corporativo posta e moede currículos; admin modera. */
export function navItemsForRole(role: AppRole | undefined): NavItem[] {
  if (role === 'ADMIN') {
    return [
      { path: '/olimpo', icon: 'gavel', label: 'Moderação de Lama' },
      { path: '/iscas', icon: 'dangerous', label: 'Vagas (preview)' },
    ];
  }
  if (role === 'CORPORATE') {
    return [
      { path: '/iscas', icon: 'dangerous', label: 'Vagas Insalubres' },
      { path: '/lancar-isca', icon: 'post_add', label: 'Lançar vaga podre' },
      { path: '/moedor', icon: 'receipt', label: 'Moedor de Currículo' },
      { path: '/contratos', icon: 'hub', label: 'Rede de Esgoto' },
    ];
  }
  return [
    { path: '/iscas', icon: 'dangerous', label: 'Vagas Insalubres' },
    { path: '/contratos', icon: 'hub', label: 'Rede de Esgoto' },
  ];
}


