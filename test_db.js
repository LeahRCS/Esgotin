import { PrismaClient } from './.wasp/out/server/node_modules/@prisma/client/index.js';
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.findUnique({
    where: { username: 'esgoto_root' },
    include: { auth: { include: { identities: true } } }
  });
  console.log("Admin User:", JSON.stringify(admin, null, 2));
  
  const worker = await prisma.user.findUnique({
    where: { username: 'rato_operario' },
    include: { auth: { include: { identities: true } } }
  });
  console.log("Worker User:", JSON.stringify(worker, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
