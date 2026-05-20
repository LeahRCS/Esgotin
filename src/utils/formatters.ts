/**
 * ESGOTIN — Utility Formatters
 */

/** Formata data no padrão brasileiro DD/MM/AAAA */
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('pt-BR');
}

/** Formata número como moeda BRL */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

/** Trunca string com "..." */
export function truncate(str: string, maxLen: number): string {
  return str.length > maxLen ? str.slice(0, maxLen) + '...' : str;
}



/** Gera código de vaga aleatório no padrão ESGOTIN */
export function generateJobCode(prefix = 'TOX'): string {
  const num = Math.floor(Math.random() * 900) + 100;
  return `#${prefix}-${num}`;
}
