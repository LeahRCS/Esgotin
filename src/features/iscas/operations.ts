import { type GetIscas } from 'wasp/server/operations';
import type { Job } from 'wasp/entities';

// ─── Query: getIscas ───────────────────────────────────────
export const getIscas: GetIscas<void, Job[]> = async (_args, context) => {
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
