import { HttpError } from 'wasp/server';
import { type GetOlimpoMetrics, type CreateJob, type ApproveProtocol, type RejectProtocol } from 'wasp/server/operations';
import type { Job } from 'wasp/entities';

type OlimpoMetrics = {
  totalJobs: number;
  totalApplications: number;
  exploitedCount: number;
  rejectedCount: number;
  pendingJobs: Job[];
  chartData: number[];
};

export const getOlimpoMetrics: GetOlimpoMetrics<void, OlimpoMetrics> = async (_args, context) => {
  if (!context.user) throw new HttpError(401, 'Autenticação necessária');
  if (context.user.role !== 'ADMIN') {
    throw new HttpError(403, 'Área restrita ao Ministério da Lama.');
  }

  const [totalJobs, totalApps, exploited, rejected, pendingJobs, recentApps] = await Promise.all([
    context.entities.Job.count(),
    context.entities.Application.count(),
    context.entities.Application.count({ where: { status: 'EXPLOITED' } }),
    context.entities.Application.count({ where: { status: 'REJECTED' } }),
    context.entities.Job.findMany({
      where: { status: 'PENDING_MODERATION' },
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        postedBy: {
          select: { id: true, username: true, displayName: true, role: true, status: true, createdAt: true }
        },
        _count: { select: { applications: true } }
      },
    }),
    context.entities.Application.findMany({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      },
      select: { createdAt: true }
    })
  ]);

  const chartData = [0, 0, 0, 0, 0, 0, 0];
  const now = new Date();
  
  recentApps.forEach(app => {
    // Calcula quantos dias atrás (0 = hoje, 6 = 6 dias atrás)
    const diffTime = now.getTime() - app.createdAt.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays >= 0 && diffDays < 7) {
      chartData[6 - diffDays]++;
    }
  });

  return {
    totalJobs,
    totalApplications: totalApps,
    exploitedCount: exploited,
    rejectedCount: rejected,
    pendingJobs,
    chartData,
  };
};

/** Corporativo envia proposta; fica pendente até o admin aprovar. */
export const createJob: CreateJob<Omit<Job, 'id' | 'createdAt' | 'postedById' | 'status'>, Job> = async (
  data,
  context
) => {
  if (!context.user) throw new HttpError(401, 'Autenticação necessária');
  if (context.user.role !== 'CORPORATE') {
    throw new HttpError(403, 'Apenas contas corporativas podem solicitar vaga.');
  }

  const job = await context.entities.Job.create({
    data: {
      code: data.code,
      companyName: data.companyName,
      title: data.title,
      salary: data.salary,
      description: data.description,
      requirements: data.requirements,
      tags: data.tags,
      toxicityLevel: data.toxicityLevel ?? 100,
      status: 'PENDING_MODERATION',
      postedById: context.user.id,
    },
  });

  // Notificar admins
  const admins = await context.entities.User.findMany({ where: { role: 'ADMIN' } });
  for (const admin of admins) {
    await context.entities.Notification.create({
      data: {
        userId: admin.id,
        message: `Nova vaga podre solicitada por ${context.user.displayName}: "${job.title}". Aguardando aprovação.`,
        type: 'WARNING',
      }
    });
  }

  return job;
};

/** Publica no feed público (iscas). */
export const approveProtocol: ApproveProtocol<{ jobId: number }, Job> = async ({ jobId }, context) => {
  if (!context.user) throw new HttpError(401, 'Autenticação necessária');
  if (context.user.role !== 'ADMIN') {
    throw new HttpError(403, 'Só o moderador pode aprovar protocolo.');
  }
  const job = await context.entities.Job.findUnique({ where: { id: jobId } });
  if (!job || job.status !== 'PENDING_MODERATION') {
    throw new HttpError(400, 'Protocolo inválido ou já processado.');
  }
  const updatedJob = await context.entities.Job.update({ where: { id: jobId }, data: { status: 'ACTIVE' } });

  await context.entities.Notification.create({
    data: {
      userId: job.postedById,
      message: `Sua vaga "${job.title}" foi APROVADA e está aberta para exploração.`,
      type: 'SUCCESS',
    }
  });

  return updatedJob;
};

/** Recusa a proposta de vaga. */
export const rejectProtocol: RejectProtocol<{ jobId: number }, Job> = async ({ jobId }, context) => {
  if (!context.user) throw new HttpError(401, 'Autenticação necessária');
  if (context.user.role !== 'ADMIN') {
    throw new HttpError(403, 'Só o moderador pode rejeitar protocolo.');
  }
  const job = await context.entities.Job.findUnique({ where: { id: jobId } });
  if (!job || job.status !== 'PENDING_MODERATION') {
    throw new HttpError(400, 'Protocolo inválido ou já processado.');
  }
  const updatedJob = await context.entities.Job.update({ where: { id: jobId }, data: { status: 'CLOSED' } });

  await context.entities.Notification.create({
    data: {
      userId: job.postedById,
      message: `Sua vaga "${job.title}" foi REJEITADA pelo ministério. Insalubridade insuficiente.`,
      type: 'DANGER',
    }
  });

  return updatedJob;
};
