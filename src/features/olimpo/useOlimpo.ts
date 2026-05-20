import { useQuery, getOlimpoMetrics } from 'wasp/client/operations';
import { useAction, approveProtocol, rejectProtocol } from 'wasp/client/operations';

export function useOlimpo() {
  const { data, isLoading, error, refetch } = useQuery(getOlimpoMetrics);
  const approve = useAction(approveProtocol);
  const reject  = useAction(rejectProtocol);

  return {
    metrics:       data,
    pendingJobs:   data?.pendingJobs ?? [],
    isLoading,
    error,
    refetch,
    approveProtocol: (jobId: number) => approve({ jobId }),
    rejectProtocol:  (jobId: number) => reject({ jobId }),
  };
}
