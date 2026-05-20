import { HttpError } from 'wasp/server';
import { type GetMoedorData } from 'wasp/server/operations';
import { type ApproveApplication, type RejectApplication } from 'wasp/server/operations';
import type { Job, Application } from 'wasp/entities';

type MoedorData = {
  jobs: Job[];
  applications: Application[];
};

export const getMoedorData: GetMoedorData<void, MoedorData> = async (_args, context) => {
  if (!context.user) throw new HttpError(401, 'Autenticação necessária');
  if (context.user.role !== 'CORPORATE') {
    throw new HttpError(403, 'Apenas perfil corporativo acessa o moedor.');
  }

  const [jobs, applications] = await Promise.all([
    context.entities.Job.findMany({
      where: { postedById: context.user.id, status: 'ACTIVE' },
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { applications: true } } },
    }),
    context.entities.Application.findMany({
      where: { job: { postedById: context.user.id } },
      orderBy: { createdAt: 'desc' },
      include: {
        applicant: {
          select: { id: true, username: true, displayName: true, role: true, status: true, createdAt: true }
        },
        job: true
      },
    }),
  ]);

  return { jobs, applications };
};

export const approveApplication: ApproveApplication<{ applicationId: number }, Application> = async (
  { applicationId },
  context
) => {
  if (!context.user) throw new HttpError(401, 'Autenticação necessária');
  if (context.user.role !== 'CORPORATE') {
    throw new HttpError(403, 'Apenas corporativo pode moer currículos.');
  }
  const app = await context.entities.Application.findUnique({
    where: { id: applicationId },
    include: { job: true },
  });
  if (!app || app.job.postedById !== context.user.id) {
    throw new HttpError(403, 'Esta candidatura não é das suas vagas.');
  }
  
  const updatedApp = await context.entities.Application.update({
    where: { id: applicationId },
    data: { status: 'EXPLOITED', rhResponse: 'Parabéns! Você foi aprovado para a exploração.' },
  });

  await context.entities.Notification.create({
    data: {
      userId: app.applicantId,
      message: `Sua candidatura para a vaga "${app.job.title}" foi APROVADA. Prepare-se para a exploração.`,
      type: 'SUCCESS',
    }
  });

  return updatedApp;
};

export const rejectApplication: RejectApplication<{ applicationId: number }, Application> = async (
  { applicationId },
  context
) => {
  if (!context.user) throw new HttpError(401, 'Autenticação necessária');
  if (context.user.role !== 'CORPORATE') {
    throw new HttpError(403, 'Apenas corporativo pode moer currículos.');
  }
  const app = await context.entities.Application.findUnique({
    where: { id: applicationId },
    include: { job: true },
  });
  if (!app || app.job.postedById !== context.user.id) {
    throw new HttpError(403, 'Esta candidatura não é das suas vagas.');
  }
  
  const updatedApp = await context.entities.Application.update({
    where: { id: applicationId },
    data: { status: 'REJECTED', rhResponse: 'Seu perfil é excessivamente humano para nossa dinâmica mecânica.' },
  });

  await context.entities.Notification.create({
    data: {
      userId: app.applicantId,
      message: `Sua candidatura para a vaga "${app.job.title}" foi REJEITADA. Tente ser mais explorável na próxima.`,
      type: 'DANGER',
    }
  });

  return updatedApp;
};
