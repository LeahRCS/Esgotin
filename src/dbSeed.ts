import type { PrismaClient } from '@prisma/client';
import { sanitizeAndSerializeProviderData } from 'wasp/server/auth';

/**
 * Popula o banco com usuários de demo, vagas e candidaturas.
 * Executar: `wasp db seed seedEsgotin`
 */
export async function seedEsgotin(prisma: PrismaClient) {
  console.log('🐀 Iniciando a inundação do esgoto...');

  let worker = await prisma.user.findUnique({ where: { username: 'rato_operario' } });
  if (!worker) {
    const providerData = await sanitizeAndSerializeProviderData({
      hashedPassword: 'esgoto123',
    });
    worker = await prisma.user.create({
      data: {
        username: 'rato_operario',
        password: 'managed-by-auth',
        displayName: 'Rato Operario',
        role: 'WORKER',
        status: 'desempregado',
        auth: {
          create: {
            identities: {
              create: {
                providerName: 'username',
                providerUserId: 'rato_operario',
                providerData,
              },
            },
          },
        },
      },
    });
  }

  let corporate = await prisma.user.findUnique({ where: { username: 'rato_corporativo' } });
  if (!corporate) {
    const providerData = await sanitizeAndSerializeProviderData({
      hashedPassword: 'explorar123',
    });
    corporate = await prisma.user.create({
      data: {
        username: 'rato_corporativo',
        password: 'managed-by-auth',
        displayName: 'Rato Corporativo',
        role: 'CORPORATE',
        status: 'demitindo em massa',
        auth: {
          create: {
            identities: {
              create: {
                providerName: 'username',
                providerUserId: 'rato_corporativo',
                providerData,
              },
            },
          },
        },
      },
    });
  }

  let admin = await prisma.user.findUnique({ where: { username: 'esgoto_root' } });
  if (!admin) {
    const providerData = await sanitizeAndSerializeProviderData({
      hashedPassword: 'modera123',
    });
    admin = await prisma.user.create({
      data: {
        username: 'esgoto_root',
        password: 'managed-by-auth',
        displayName: 'Moderador da Lama',
        role: 'ADMIN',
        status: 'drenando',
        auth: {
          create: {
            identities: {
              create: {
                providerName: 'username',
                providerUserId: 'esgoto_root',
                providerData,
              },
            },
          },
        },
      },
    });
  }

  console.log('✅ Usuários criados:', worker.username, corporate.username, admin.username);

  const jobs = [
    {
      code: '#TOX-882',
      companyName: 'Globo-Corp S/A',
      title: 'Dev Jr. (Exige 10 anos exp)',
      salary: 'R$ 1.200 (PJ + "Mimos")',
      description:
        'Buscamos um Rockstar Developer com 20 anos de experiência em tecnologias lançadas semana passada.',
      requirements:
        'Disponibilidade 28/7 (incluindo feriados em Marte).\nSalário: Pago em exposição e cupons de desconto em esgoto tratado.\nBenefícios: Café frio e cadeiras que rangem.',
      tags: ['INSALUBRIDADE MÁXIMA', 'ZERO BENEFÍCIOS'],
      toxicityLevel: 100,
    },
    {
      code: '#ESG-001',
      companyName: 'Infrasewer Logistics',
      title: 'Analista de Lixo Tóxico',
      salary: 'Vaga Voluntária (Network!)',
      description:
        'Procuramos alguém apaixonado por resíduos corporativos e disposto a trabalhar de graça por "experiência".',
      requirements:
        'Não possuir alma (preferencial).\nCapacidade de digitação rápida sob estresse hídrico.\nMultitarefa: Operar moedor e preencher planilhas simultaneamente.',
      tags: ['TURNO 24/7', 'HOME-DUNGEON'],
      toxicityLevel: 95,
    },
    {
      code: '#ADM-666',
      companyName: 'Suction Ventures',
      title: 'Escravo de Design 24/7',
      salary: 'Salário Emocional',
      description:
        'Você irá criar peças incríveis enquanto não dorme há 72 horas. Isso é paixão.',
      requirements:
        '15 anos de exp em Windows 3.11.\nResistência a gases metanos.\nAceitar pagamento em "Vouchers de Oxigênio".',
      tags: ['URGENTE', 'ALTA TOXICIDADE'],
      toxicityLevel: 98,
    },
    {
      code: '#SEC-404',
      companyName: 'BioHazard FinTech',
      title: 'Gerente de Crise Eterna',
      salary: 'R$ 3.000 + Burnout Grátis',
      description:
        'Gerenciamento de pânico em tempo real. Se você não entrar em colapso, não é bom o suficiente.',
      requirements:
        'Gritar com estagiários em 4 idiomas.\nSaber esconder balanços negativos.\nImunidade a processos trabalhistas.',
      tags: ['INSALUBRIDADE MÁXIMA'],
      toxicityLevel: 88,
    },
    {
      code: '#RAT-015',
      companyName: 'RatRace Solutions',
      title: 'Limpador de Cache Sujo',
      salary: '15 Ticket Refeição',
      description: 'A vaga que você não pediu, mas merece.',
      requirements:
        'Disponibilidade para reiniciar servidores às 3am.\nConhecimento em esgoto legado (COBOL + Fortran).',
      tags: ['ZERO BENEFÍCIOS'],
      toxicityLevel: 72,
    },
    {
      code: '#STG-000',
      companyName: 'Stagnant Water Inc.',
      title: 'Product Owner de Nada',
      salary: 'Ações que valem zero',
      description: 'Você vai ownar produtos que nunca serão lançados. É um trabalho artístico.',
      requirements: 'Dominar metodologias ágeis fictícias.\nProibido questionar o roadmap.',
      tags: ['TURNO 24/7', 'HOME-DUNGEON'],
      toxicityLevel: 60,
    },
  ];

  for (const job of jobs) {
    await prisma.job.upsert({
      where: { code: job.code },
      update: {},
      create: { ...job, postedById: corporate.id, status: 'ACTIVE' },
    });
  }

  console.log(`✅ ${jobs.length} vagas infames criadas.`);

  await prisma.job.upsert({
    where: { code: '#MOD-001' },
    update: {},
    create: {
      code: '#MOD-001',
      companyName: 'Lama Protocol Inc.',
      title: '[DEMO] Vaga aguardando a Lama (aprovar ou rejeitar)',
      salary: 'Exposure eterno',
      description:
        'Esta vaga foi semeada para a fila de moderação. O admin vê em Olimpo; operários não veem até aprovar.',
      requirements: 'Ser paciente com burocracia.',
      tags: ['DEMO', 'MODERACAO'],
      toxicityLevel: 50,
      status: 'PENDING_MODERATION',
      postedById: corporate.id,
    },
  });
  console.log('✅ Vaga de demonstração na fila de moderação (#MOD-001).');

  const job1 = await prisma.job.findUnique({ where: { code: '#TOX-882' } });
  const job2 = await prisma.job.findUnique({ where: { code: '#ESG-001' } });

  if (job1 && job2) {
    await prisma.application.createMany({
      data: [
        {
          applicantId: worker.id,
          jobId: job1.id,
          coverLetter:
            'Prezados gestores, estou escrevendo pois não possuo mais alternativas de subsistência. Aceito a carga horária de 16 horas diárias sem questionamentos. Minha saúde mental é um ativo depreciável que coloco inteiramente à vossa disposição.',
          status: 'REJECTED',
          rhResponse:
            'Sentimos que seu perfil é excessivamente humano para nossa dinâmica mecânica. Uma IA facilmente lhe supera.',
          exploitability: 85,
          debtLevel: 'ALTO (Serasa 100)',
          vitalStatus: 'EXAURIDO',
          socialDeathDate: new Date('2026-03-12'),
        },
        {
          applicantId: worker.id,
          jobId: job2.id,
          coverLetter:
            'Estou desesperada. Minha conta zerou e o aluguel vence amanhã. Juro que não vou reclamar do cheiro. Tenho meu próprio balde.',
          status: 'EXPLOITED',
          rhResponse:
            'Parabéns! Você foi o que menos reclamou do cheiro. Apresente-se amanhã às 04h munido de seu próprio balde.',
          exploitability: 98,
          debtLevel: 'CRÍTICO',
          vitalStatus: 'DESESPERADA',
          socialDeathDate: new Date('2026-03-14'),
        },
      ],
      skipDuplicates: true,
    });
    console.log('✅ Candidaturas criadas.');
  }

  console.log('🐀 Esgoto populado com sucesso. O sistema está decompondo normalmente.');
}
