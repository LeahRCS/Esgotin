import React, { useState } from 'react';
import { useSearchParams } from 'react-router';
import { AppShell } from '../../components/shell/AppShell';
import { RequireRole } from '../../components/auth/RequireRole';
import { Win95Window } from '../../components/shell/Win95Window';
import { BevelButton } from '../../components/ui/BevelButton';
import { useMoedor } from './useMoedor';
import type { Application, Job, User } from 'wasp/entities';

type AppWithRelations = Application & { applicant: Pick<User, 'id' | 'displayName'> };
type JobWithCount = Job & { _count: { applications: number } };

export function MoedorPage() {
  return (
    <RequireRole roles={['CORPORATE']}>
      <MoedorContent />
    </RequireRole>
  );
}

function MoedorContent() {
  const [searchParams] = useSearchParams();
  const q = (searchParams.get('q') || '').toLowerCase();
  const { jobs: rawJobs, applications: rawApps, isLoading, approveApplication, rejectApplication } = useMoedor();
  const jobs = rawJobs as unknown as JobWithCount[];
  const applications = rawApps as unknown as AppWithRelations[];
  const [selectedJobId, setSelectedJobId]   = useState<number | null>(null);
  const [selectedAppId, setSelectedAppId]   = useState<number | null>(null);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(q) || job.companyName.toLowerCase().includes(q) || String(job.code).toLowerCase().includes(q)
  );

  const selectedApp = applications.find((a) => a.id === selectedAppId) ?? applications[0] ?? null;
  const visibleApps = selectedJobId
    ? applications.filter((a) => a.jobId === selectedJobId)
    : applications;

  const filteredVisibleApps = visibleApps.filter(app => {
    const name = app.applicant?.displayName || 'Anônimo';
    return name.toLowerCase().includes(q);
  });

  return (
    <AppShell>
      <Win95Window
        title="Gestão do Moedor v2.0 - [SISTEMA DE EXTRAÇÃO CORPORATIVA]"
        icon="restaurant"
        menuItems={['Arquivo', 'Vagas', 'Processar', 'Relatórios', 'Ajuda']}
        statusBarItems={[
          { label: 'SISTEMA ONLINE' },
          { label: 'CPU: 92%' },
          { label: 'MORAL: 4%', grow: true },
          { label: '⬡ MODO: PREDADOR' },
        ]}
        style={{ height: '100%' }}
      >
        {/* Split Pane */}
        <div style={{ flex: 1, display: 'flex', gap: '8px', padding: '8px', overflow: 'hidden' }}>
          {/* Left — Jobs List */}
          <div style={{ width: '33%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div className="tb-label-sm" style={{ color: '#3E4949', display: 'flex', alignItems: 'center', gap: '4px', padding: '0 4px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>list_alt</span>
              Vagas em Atividade
            </div>
            <div style={{ flex: 1, background: '#FFFFFF', boxShadow: 'inset 2px 2px 0px #808080, inset -2px -2px 0px #FFFFFF', overflowY: 'auto', padding: '4px' }}>
              {filteredJobs.length === 0 ? (
                <div style={{ padding: '24px 8px', textAlign: 'center', color: '#808080' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '24px', opacity: 0.5 }}>work_off</span>
                  <p className="tb-label-sm" style={{ marginTop: '4px' }}>Nenhuma vaga ativa</p>
                </div>
              ) : (
                filteredJobs.map((job) => {
                  const isSelected = job.id === selectedJobId;
                  return (
                    <div
                      key={job.id}
                      onClick={() => setSelectedJobId(job.id)}
                      style={{
                        padding: '8px',
                        marginBottom: '2px',
                        cursor: 'pointer',
                        background: isSelected ? '#00006E' : 'transparent',
                        color:      isSelected ? '#38FE13'  : '#1A1C1C',
                        borderBottom: '2px solid rgba(0,0,0,0.06)',
                      }}
                    >
                      <p className="tb-label-sm" style={{ margin: 0, lineHeight: 1.2, color: 'inherit' }}>{job.title}</p>
                      <p className="tb-label-sm" style={{ margin: 0, opacity: 0.7, color: 'inherit' }}>
                        Candidatos: {job._count?.applications ?? 0} • ID: {job.code}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right — Applications + Detail */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', overflow: 'hidden' }}>
            {/* Applications Table */}
            <div style={{ height: '33%', boxShadow: 'inset 2px 2px 0px #808080, inset -2px -2px 0px #FFFFFF', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <table className="drain-table">
                <thead>
                  <tr>
                    <th>Desesperado</th>
                    <th>Nível de Dívida</th>
                    <th>Status Vital</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVisibleApps.length === 0 && (
                    <tr>
                      <td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#3E4949', background: '#FAFAFA' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#808080', display: 'block', marginBottom: '8px' }}>
                          inbox
                        </span>
                        Nenhum currículo para moer no momento.
                      </td>
                    </tr>
                  )}
                  {filteredVisibleApps.map((app) => (
                    <tr
                      key={app.id}
                      onClick={() => setSelectedAppId(app.id)}
                      style={{ cursor: 'pointer', background: app.id === selectedAppId ? 'rgba(56,254,19,0.1)' : undefined }}
                    >
                      <td style={{ fontWeight: 700 }}>{app.applicant?.displayName ?? 'Anônimo'} #{app.applicant?.id}</td>
                      <td>{app.debtLevel ?? 'MÉDIO'}</td>
                      <td style={{ color: app.status === 'EXPLOITED' ? '#106E00' : app.status === 'REJECTED' ? '#BA1A1A' : '#006565', fontWeight: 900 }}>
                        {app.vitalStatus ?? app.status}
                      </td>
                      <td>
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: '16px', cursor: 'pointer' }}
                          onClick={() => setSelectedAppId(app.id)}
                        >
                          visibility
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Candidate Detail / Cover Letter */}
            {selectedApp ? (
              <div style={{ flex: 1, background: '#FFFFFF', boxShadow: 'inset 2px 2px 0px #808080, inset -2px -2px 0px #FFFFFF', padding: '16px', display: 'flex', gap: '24px', overflow: 'hidden' }}>
                {/* Avatar + Exploitability */}
                <div style={{ width: '96px', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '96px', height: '96px', background: '#E3E2E2', boxShadow: '2px 2px 0px black', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                    <span className="material-symbols-outlined filled" style={{ fontSize: '64px', color: '#3E4949' }}>person</span>
                  </div>
                  <span className="tb-label-sm" style={{ color: '#6E7979', textAlign: 'center' }}>
                    INDIVÍDUO #{selectedApp.applicantId}
                  </span>

                </div>

                {/* Cover Letter */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E8E8E8', marginBottom: '8px' }}>
                    <h3 className="tb-label-sm" style={{ margin: 0, color: '#3E4949' }}>CARTA DE MISÉRIA</h3>
                    <span className="chip chip-rejected" style={{ fontSize: '0.5rem' }}>CONFIDENCIAL</span>
                  </div>
                  <div style={{ flex: 1, background: '#F4F3F3', padding: '12px', fontFamily: "'Courier New', monospace", fontSize: '0.6875rem', color: '#3E4949', boxShadow: 'inset 2px 2px 0px #808080, inset -2px -2px 0px #FFFFFF', overflow: 'auto', lineHeight: 1.6 }}>
                    {selectedApp.coverLetter}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <BevelButton
                      variant="toxic"
                      icon="bolt"
                      style={{ flex: 1, justifyContent: 'center' }}
                      onClick={async () => {
                        const btn = document.activeElement as HTMLButtonElement;
                        if(btn) btn.disabled = true;
                        try {
                          await approveApplication(selectedApp.id);
                        } finally {
                          if(btn) btn.disabled = false;
                        }
                      }}
                    >
                      EXPLORAR (ACEITAR)
                    </BevelButton>
                    <BevelButton
                      variant="danger"
                      icon="delete"
                      style={{ flex: 1, justifyContent: 'center' }}
                      onClick={async () => {
                        const btn = document.activeElement as HTMLButtonElement;
                        if(btn) btn.disabled = true;
                        try {
                          await rejectApplication(selectedApp.id);
                        } finally {
                          if(btn) btn.disabled = false;
                        }
                      }}
                    >
                      DESCARTAR (REJEITAR)
                    </BevelButton>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ flex: 1, background: '#FAFAFA', boxShadow: 'inset 2px 2px 0px #808080, inset -2px -2px 0px #FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#808080' }}>
                <div style={{ textAlign: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '48px', opacity: 0.5 }}>assignment_ind</span>
                  <p className="tb-label-sm" style={{ marginTop: '8px' }}>Selecione um currículo para processar</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Win95Window>
    </AppShell>
  );
}
