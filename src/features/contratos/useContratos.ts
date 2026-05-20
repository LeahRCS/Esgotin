import { useQuery, getContratos } from 'wasp/client/operations';

export function useContratos() {
  const { data, isLoading, error, refetch } = useQuery(getContratos);
  return { contratos: data ?? [], isLoading, error, refetch };
}
