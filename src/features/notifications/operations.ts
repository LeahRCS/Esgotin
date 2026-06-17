import { HttpError } from 'wasp/server';
import { type GetNotifications, type MarkNotificationRead } from 'wasp/server/operations';
import type { Notification } from 'wasp/entities';

export const getNotifications: GetNotifications<void, Notification[]> = async (_args, context) => {
  if (!context.user) throw new HttpError(401, 'Autenticação necessária');

  return context.entities.Notification.findMany({
    where: { userId: context.user.id },
    orderBy: { createdAt: 'desc' },
  });
};

export const markNotificationRead: MarkNotificationRead<{ id: number }, Notification> = async (
  { id },
  context
) => {
  if (!context.user) throw new HttpError(401, 'Autenticação necessária');

  const notification = await context.entities.Notification.findUnique({
    where: { id },
  });

  if (!notification || notification.userId !== context.user.id) {
    throw new HttpError(403, 'Você não tem acesso a esta notificação.');
  }

  return context.entities.Notification.update({
    where: { id },
    data: { isRead: true },
  });
};

export const deleteNotification = async ({ id }: { id: number }, context: any) => {
  if (!context.user) throw new HttpError(401, 'Autenticação necessária');
  
  const notification = await context.entities.Notification.findUnique({ where: { id } });
  if (!notification || notification.userId !== context.user.id) {
    throw new HttpError(403, 'Você não tem acesso a esta notificação.');
  }

  await context.entities.Notification.delete({ where: { id } });
};

export const deleteAllNotifications = async (_args: void, context: any) => {
  if (!context.user) throw new HttpError(401, 'Autenticação necessária');

  await context.entities.Notification.deleteMany({ where: { userId: context.user.id } });
};
