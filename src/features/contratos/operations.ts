import { HttpError } from 'wasp/server';
import type { Application } from 'wasp/entities';

export const getContratos = async (_args: void, context: any) => {
  if (!context.user) throw new HttpError(401, 'Autenticação necessária');

  if (context.user.role === 'CORPORATE') {
    return context.entities.Application.findMany({
      where: { 
        status: 'EXPLOITED',
        job: { postedById: context.user.id }
      },
      orderBy: { createdAt: 'desc' },
      include: { 
        job: true,
        applicant: {
          select: { id: true, username: true, displayName: true, role: true, status: true, createdAt: true, document: true }
        }
      },
    });
  }

  const applications = await context.entities.Application.findMany({
    where: { applicantId: context.user.id },
    orderBy: { createdAt: 'desc' },
    include: { 
      job: {
        include: {
          postedBy: {
            select: { id: true, displayName: true, document: true }
          }
        }
      } 
    },
  });

  return applications.map((app: any) => {
    if (app.status !== 'EXPLOITED') {
      if (app.job.postedBy) {
        app.job.postedBy.document = null;
      }
    }
    return app;
  });
};

export const fireEmployee = async (
  { applicationId }: { applicationId: number },
  context: any
) => {
  if (!context.user) throw new HttpError(401, 'Autenticação necessária');
  if (context.user.role !== 'CORPORATE') {
    throw new HttpError(403, 'Apenas corporativos podem demitir funcionários.');
  }

  const app = await context.entities.Application.findUnique({
    where: { id: applicationId },
    include: { job: true },
  });

  if (!app || app.job.postedById !== context.user.id) {
    throw new HttpError(403, 'Você não tem permissão para demitir este funcionário.');
  }

  const updatedApp = await context.entities.Application.update({
    where: { id: applicationId },
    data: { status: 'DECOMPOSING', rhResponse: 'Promovido à vaga de desemprego.' },
  });

  await context.entities.Notification.create({
    data: {
      userId: app.applicantId,
      message: `Infelizmente você não possui mais utilidade para a empresa ${app.job.companyName}, por isso você foi promovido(a) à vaga de desemprego!`,
      type: 'DANGER',
    }
  });

  return updatedApp;
};
