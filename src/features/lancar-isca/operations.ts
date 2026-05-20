import { HttpError } from 'wasp/server';
import { type GetMinhasVagas } from 'wasp/server/operations';
import type { Job } from 'wasp/entities';

/** Vagas que este corporativo criou (inclui pendentes de moderação). */
export const getMinhasVagas: GetMinhasVagas<void, Job[]> = async (_args, context) => {
  if (!context.user) throw new HttpError(401, 'Autenticação necessária');
  if (context.user.role !== 'CORPORATE') {
    throw new HttpError(403, 'Apenas corporativo.');
  }
  return context.entities.Job.findMany({
    where: { postedById: context.user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      postedBy: {
        select: { id: true, username: true, displayName: true, role: true, status: true, createdAt: true }
      }
    },
  });
};
