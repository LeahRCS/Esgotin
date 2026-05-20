import { type GetIscasPublic, type GetJobDetailPublic } from 'wasp/server/operations';
import { HttpError } from 'wasp/server';
import type { Job } from 'wasp/entities';

/**
 * Query pública — retorna vagas ativas sem exigir autenticação.
 * Usada exclusivamente pelo modo "Espiadinha".
 */
export const getIscasPublic: GetIscasPublic<void, Job[]> = async (_args, context) => {
  return context.entities.Job.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { createdAt: 'desc' },
    include: {
      postedBy: {
        select: { id: true, username: true, displayName: true, role: true, status: true, createdAt: true }
      }
    },
  });
};

/**
 * Query pública — retorna detalhes de uma vaga ACTIVE sem autenticação.
 */
export const getJobDetailPublic: GetJobDetailPublic<{ jobId: number }, Job> = async ({ jobId }, context) => {
  const job = await context.entities.Job.findUnique({
    where: { id: jobId },
    include: {
      postedBy: {
        select: { id: true, username: true, displayName: true, role: true, status: true, createdAt: true }
      }
    },
  });
  if (!job || job.status !== 'ACTIVE') {
    throw new HttpError(404, 'Vaga não encontrada no esgoto.');
  }
  return job;
};
