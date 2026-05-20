import React, { useState } from 'react';
import { useSearchParams } from 'react-router';
import { useAuth } from 'wasp/client/auth';
import { AppShell } from '../../components/shell/AppShell';
import { Win95Window } from '../../components/shell/Win95Window';
import { BevelButton } from '../../components/ui/BevelButton';
import { StatusChip } from '../../components/ui/StatusChip';
import { fireEmployee } from 'wasp/client/operations';
import { useContratos } from './useContratos';
import type { Application, Job, User } from 'wasp/entities';

type AppWithRelations = Application & {
  applicant: Pick<User, 'id' | 'displayName'>;
  job: Pick<Job, 'id' | 'code' | 'title' | 'companyName'>;
};

export function ContratosPage() {
  const [searchParams] = useSearchParams();
  const q = (searchParams.get('q') || '').toLowerCase();
  const { data: user } = useAuth();
  const isCorporate = user?.role === 'CORPORATE';
  const { contratos: rawContratos, isLoading, error, refetch } = useContratos();
  const contratos = rawContratos as unknown as AppWithRelations[];
  const [fireConfirmAppId, setFireConfirmAppId] = useState<number | null>(null);

  const appToFire = contratos.find(app => app.id === fireConfirmAppId);
  const applicantNameToFire = appToFire?.applicant?.displayName || 'este infeliz';

  const filteredContratos = contratos.filter(app => {
    const job = app.job;
    const title = job?.title || '';
    const company = job?.companyName || '';
    const applicantName = app.applicant?.displayName || '';
    return title.toLowerCase().includes(q) || company.toLowerCase().includes(q) || (isCorporate && applicantName.toLowerCase().includes(q));
  });


  const getDaysDifference = (dateStr: Date | string) => {
    const diffTime = Math.abs(new Date().getTime() - new Date(dateStr).getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <AppShell>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Win95Window
          title={isCorporate ? "Gestao_De_Lama_Humana.exe" : "Painel_De_Contratos_v0.9.exe"}
          icon="table_view"
          toolbar={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <BevelButton icon="refresh" onClick={() => refetch()}>
                  Atualizar Desgraça
                </BevelButton>
                <BevelButton icon="file_download" disabled>
                  Exportar Lágrimas
                </BevelButton>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Dignity bar */}
                <div style={{ background: '#FFFFFF', boxShadow: 'inset 2px 2px 0px #808080, inset -2px -2px 0px #FFFFFF', padding: '2px 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="tb-label-sm" style={{ color: '#3E4949' }}>Dignidade Restante:</span>
                  <div style={{ width: '80px', height: '16px', background: '#E8E8E8', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="tb-label-sm" style={{ color: '#1A1C1C', zIndex: 1 }}>0%</span>
                    </div>
                  </div>
                </div>
                <span className="tb-label-sm" style={{ color: '#106E00' }}>Sessão: ATIVA_E_INSALUBRE</span>
              </div>
            </div>
          }
          statusBarItems={[
            { label: 'Para ajuda, reze. Para suporte, esqueça.', grow: true },
            { label: '⬡ SERVIDOR: LODO_PRIME' },
            { label: '15:44 PM' },
          ]}
          style={{ flex: 1 }}
        >
          <div style={{ flex: 1, overflow: 'auto', background: '#FFFFFF', boxShadow: 'inset 2px 2px 0px #808080, inset -2px -2px 0px #FFFFFF' }}>
            {isLoading && (
              <div style={{ padding: '32px', textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.75rem', textTransform: 'uppercase', color: '#3E4949' }}>
                Compilando sua miséria...
              </div>
            )}
            {!isLoading && (
              <table className="drain-table" style={{ tableLayout: 'fixed' }}>
                <thead>
                  <tr>
                    <th style={{ width: '40px' }}></th>
                    <th style={{ width: '100px' }}>{isCorporate ? 'Nome_Indivíduo' : 'Cód_Vaga'}</th>
                    <th style={{ width: '200px' }}>{isCorporate ? 'Cargo_de_Escravidão' : 'Cargo / Setor'}</th>
                    <th style={{ width: '160px' }}>{isCorporate ? 'Status_Vital' : 'Status_Protocolo'}</th>
                    <th style={{ width: '300px' }}>{isCorporate ? 'Tempo_de_Exploração' : 'Resposta_RH (Passiva-Agressiva)'}</th>
                    <th style={{ width: '120px' }}>{isCorporate ? 'Ação_Disciplinar' : 'Data_Óbito_Social'}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContratos.map((app, i) => (
                    <tr key={app.id} style={{ background: i % 2 !== 0 ? 'rgba(244,243,243,0.5)' : undefined }}>
                      <td style={{ textAlign: 'center', fontWeight: 700, background: '#EEEEEE' }}>{i + 1}</td>
                      <td style={{ fontFamily: isCorporate ? "'Space Grotesk', sans-serif" : "'Courier New', monospace", fontWeight: isCorporate ? 700 : 'normal' }}>
                        {isCorporate ? app.applicant?.displayName || 'Anônimo' : app.job?.code ?? '—'}
                      </td>
                      <td style={{ fontWeight: 700, textTransform: 'uppercase' }}>{app.job?.title ?? '—'}</td>
                      <td><StatusChip status={app.status} /></td>
                      <td style={{ fontStyle: 'italic', color: '#3E4949' }}>
                        {isCorporate 
                          ? `${getDaysDifference(app.createdAt)} dias em exploração (admitido em ${new Date(app.createdAt).toLocaleDateString('pt-BR')})` 
                          : app.rhResponse ?? '—'}
                      </td>
                      <td style={{ fontFamily: "'Courier New', monospace", textAlign: 'center' }}>
                        {isCorporate ? (
                          <button 
                            className="btn-danger" 
                            style={{ fontSize: '0.625rem', padding: '4px 8px' }}
                            onClick={() => setFireConfirmAppId(app.id)}
                          >
                            DEMITIR
                          </button>
                        ) : (
                          app.socialDeathDate
                            ? new Date(app.socialDeathDate).toLocaleDateString('pt-BR')
                            : new Date(app.createdAt).toLocaleDateString('pt-BR')
                        )}
                      </td>
                    </tr>
                  ))}
                  {/* Empty filler rows */}
                  {Array.from({ length: Math.max(0, 16 - filteredContratos.length) }).map((_, i) => (
                    <tr key={`empty-${i}`} style={{ background: (filteredContratos.length + i) % 2 !== 0 ? 'rgba(244,243,243,0.5)' : undefined }}>
                      <td style={{ textAlign: 'center', fontWeight: 700, background: '#EEEEEE' }}>{filteredContratos.length + i + 1}</td>
                      <td /><td /><td /><td /><td />
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Win95Window>
      </div>

      {fireConfirmAppId && appToFire && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Win95Window title="Ação Irreversível.exe" icon="warning" style={{ width: '320px', height: 'auto', flex: 'none', margin: 'auto' }}>
            <div style={{ padding: '12px', background: '#FAFAFA', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: 'inset 2px 2px 0px #808080, inset -2px -2px 0px #FFFFFF' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span className="material-symbols-outlined filled" style={{ fontSize: '32px', color: '#BA1A1A' }}>error</span>
                <p className="tb-body-md" style={{ margin: 0, color: '#3E4949', fontWeight: 'bold', fontSize: '0.8rem' }}>
                  Esta decisão é irreversível, você aceita demitir {applicantNameToFire}?
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <BevelButton onClick={() => setFireConfirmAppId(null)}>CANCELAR</BevelButton>
                <BevelButton variant="danger" onClick={async () => {
                  const btn = document.activeElement as HTMLButtonElement;
                  if(btn) btn.disabled = true;
                  try {
                    await fireEmployee({ applicationId: fireConfirmAppId });
                    refetch();
                    setFireConfirmAppId(null);
                  } finally {
                    if(btn) btn.disabled = false;
                  }
                }}>
                  SIM, DEMITIR
                </BevelButton>
              </div>
            </div>
          </Win95Window>
        </div>
      )}
    </AppShell>
  );
}
