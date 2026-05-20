import { useQuery, getMoedorData } from 'wasp/client/operations';
import { useAction, approveApplication, rejectApplication } from 'wasp/client/operations';

export function useMoedor() {
  const { data, isLoading, error, refetch } = useQuery(getMoedorData);
  const approve = useAction(approveApplication);
  const reject  = useAction(rejectApplication);

  return {
    jobs:         data?.jobs         ?? [],
    applications: data?.applications ?? [],
    isLoading,
    error,
    refetch,
    approveApplication: (applicationId: number) => approve({ applicationId }),
    rejectApplication:  (applicationId: number) => reject({ applicationId }),
  };
}
