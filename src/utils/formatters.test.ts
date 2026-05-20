import { describe, expect, it } from 'vitest';
import { formatDate, truncate } from './formatters';

describe('formatters', () => {
  it('truncate shortens long strings', () => {
    expect(truncate('abcdef', 3)).toBe('abc...');
  });

  it('formatDate returns em dash for nullish', () => {
    expect(formatDate(null)).toBe('—');
  });
});
