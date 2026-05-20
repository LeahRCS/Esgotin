import { useQuery, getMinhasVagas } from 'wasp/client/operations';
import { useAction, createJob } from 'wasp/client/operations';

export function useLancarIsca() {
  const { data: minhas, isLoading, error, refetch } = useQuery(getMinhasVagas);
  const submit = useAction(createJob);

  return {
    minhas: minhas ?? [],
    isLoading,
    error,
    refetch,
    submit,
  };
}
