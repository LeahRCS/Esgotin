import { useQuery, getIscas } from 'wasp/client/operations';
import type { Job } from 'wasp/entities';

/**
 * useIscas — Custom hook que encapsula a Wasp query `getIscas`.
 * O TanStack Query gerencia cache, loading e re-fetch automaticamente.
 */
export function useIscas() {
  const { data, isLoading, error, refetch } = useQuery(getIscas);

  return {
    iscas:    (data ?? []) as Job[],
    isLoading,
    error,
    refetch,
  };
}
