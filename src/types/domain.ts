/**
 * ESGOTIN — Domain Types
 * Complementam os tipos gerados pelo Wasp/Prisma.
 */

/** Roles de usuário */
export type UserRole = 'WORKER' | 'CORPORATE' | 'ADMIN';

/** Status de vaga */
export type JobStatus = 'PENDING_MODERATION' | 'ACTIVE' | 'FILLED' | 'DECOMPOSING' | 'CLOSED';

/** Status de candidatura */
export type ApplicationStatus = 'PENDING' | 'EXPLOITED' | 'REJECTED' | 'DECOMPOSING';

/** Payload para criar vaga */
export interface CreateJobPayload {
  code:         string;
  companyName:  string;
  title:        string;
  salary:       string;
  description:  string;
  requirements: string;
  tags:         string[];
  toxicityLevel?: number;
}
