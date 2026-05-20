import { HttpError } from 'wasp/server';
import { type GetJobDetail, type ApplyToJob } from 'wasp/server/operations';
import type { Job, Application } from 'wasp/entities';

export const getJobDetail: GetJobDetail<{ jobId: number }, Job> = async ({ jobId }, context) => {
  const job = await context.entities.Job.findUnique({
    where: { id: jobId },
    include: {
      postedBy: {
        select: { id: true, username: true, displayName: true, role: true, status: true, createdAt: true }
      }
    },
  });
  if (!job) throw new HttpError(404, 'Vaga não encontrada no esgoto.');

  if (job.status === 'ACTIVE') {
    return job;
  }
  if (context.user?.role === 'ADMIN') {
    return job;
  }
  if (context.user?.role === 'CORPORATE' && job.postedById === context.user.id) {
    return job;
  }

  throw new HttpError(404, 'Vaga não encontrada no esgoto.');
};

export const applyToJob: ApplyToJob<{ jobId: number; coverLetter: string }, Application> = async (
  { jobId, coverLetter },
  context
) => {
  if (!context.user) throw new HttpError(401, 'Autenticação necessária');
  if (context.user.role !== 'WORKER') {
    throw new HttpError(403, 'Só ratos operários podem se candidatar.');
  }

  const job = await context.entities.Job.findUnique({ where: { id: jobId } });
  if (!job || job.status !== 'ACTIVE') {
    throw new HttpError(400, 'Vaga indisponível ou ainda não aprovada pela Lama.');
  }

  const app = await context.entities.Application.create({
    data: {
      coverLetter,
      jobId,
      applicantId: context.user.id,
      status: 'PENDING',
    },
  });

  await context.entities.Notification.create({
    data: {
      userId: job.postedById,
      message: `Novo miserável (${context.user.displayName}) candidatou-se à sua vaga "${job.title}".`,
      type: 'INFO',
    }
  });

  return app;
};
