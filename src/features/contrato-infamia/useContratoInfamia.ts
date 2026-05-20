import { useQuery, getJobDetail } from 'wasp/client/operations';
import { useAction, applyToJob } from 'wasp/client/operations';

export function useContratoInfamia(jobId: number) {
  const { data: job, isLoading, error } = useQuery(getJobDetail, { jobId });
  const apply = useAction(applyToJob);

  return {
    job,
    isLoading,
    error,
    applyToJob: (coverLetter: string) => apply({ jobId, coverLetter }),
  };
}
