import React from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuth } from 'wasp/client/auth';
import type { Job } from 'wasp/entities';
import { roleOf } from '../../auth/roles';
import { AppShell } from '../../components/shell/AppShell';
import { Win95Window } from '../../components/shell/Win95Window';
import { BevelButton } from '../../components/ui/BevelButton';
import { useIscas } from './useIscas';

export function IscasPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const q = (searchParams.get('q') || '').toLowerCase();
  const { data: user } = useAuth();
  const canApply = roleOf(user ?? null) === 'WORKER';
  const { iscas, isLoading, error, refetch } = useIscas();

  const filteredIscas = iscas.filter(job => 
    job.title.toLowerCase().includes(q) || job.companyName.toLowerCase().includes(q)
  );

  return (
    <AppShell>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', maxWidth: '860px' }}>
        <Win95Window
          title="Iscas_Corporativas.exe"
          icon="water_drop"
          menuItems={['Arquivo', 'Editar', 'Visualizar', 'Insalubridade', 'Ajuda']}
          toolbar={
            <BevelButton icon="refresh" onClick={() => refetch()}>
              Atualizar Esgoto
            </BevelButton>
          }
          statusBarItems={[
            { label: `${iscas.length} Vagas Detetadas`, grow: false },
            { label: 'Nível de Radiação: Alto' },
            { label: '● Sincronizando com a Lama' },
          ]}
          style={{ flex: 1 }}
        >
          {/* Scrollable table area */}
          <div style={{ flex: 1, overflow: 'auto', background: '#FFFFFF', boxShadow: 'inset 2px 2px 0px #808080, inset -2px -2px 0px #FFFFFF', position: 'relative' }}>
            {/* Decorative rat */}
            <div style={{ position: 'absolute', top: '80px', left: '-12px', zIndex: 20, opacity: 0.3, pointerEvents: 'none' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#000' }}>pest_control_rodent</span>
            </div>

            {isLoading && (
              <div style={{ padding: '24px', textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.75rem', textTransform: 'uppercase', color: '#3E4949' }}>
                Carregando dejetos corporativos...
              </div>
            )}

            {error && (
              <div style={{ padding: '24px', textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.75rem', color: '#BA1A1A', textTransform: 'uppercase' }}>
                ⚠ Erro ao carregar: {String(error)}
              </div>
            )}

            {!isLoading && !error && (
              <table className="drain-table" style={{ tableLayout: 'fixed' }}>
                <thead>
                  <tr style={{ background: '#EEEEEE', borderBottom: '1px solid #808080', position: 'sticky', top: 0, zIndex: 10 }}>
                    <th style={{ borderRight: '1px solid #808080', width: '22%' }}>Empresa Sanguessuga</th>
                    <th style={{ borderRight: '1px solid #808080', width: '28%' }}>Vaga de Escravidão</th>
                    <th style={{ borderRight: '1px solid #808080', width: '28%' }}>Salário Ilusório</th>
                    <th style={{ width: '22%' }}>Contrato</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIscas.length === 0 && (
                    <tr>
                      <td colSpan={4} style={{ padding: '48px 24px', textAlign: 'center', background: '#FAFAFA' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#808080' }}>
                            cleaning_services
                          </span>
                          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', color: '#1A1C1C', margin: 0, textTransform: 'uppercase' }}>
                            Esgoto Limpo
                          </h3>
                          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.75rem', color: '#3E4949', margin: 0 }}>
                            Nenhuma vaga detectada. O esgoto está temporariamente livre de corporativos predadores.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                  {filteredIscas.map((job) => (
                    <IscaRow
                      key={job.id}
                      job={job}
                      canApply={canApply}
                      onApply={() => navigate(`/contrato/${job.id}`)}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </Win95Window>
      </div>
    </AppShell>
  );
}

// ─── Presentational Row Component ─────────────────────────
function IscaRow({ job, canApply, onApply }: { job: Job; canApply: boolean; onApply: () => void }) {
  return (
    <tr
      style={{ cursor: 'default' }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(56,254,19,0.06)')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '')}
    >
      <td style={{ borderRight: '1px solid #DADADA', fontWeight: 700 }}>{job.companyName}</td>
      <td style={{ borderRight: '1px solid #DADADA' }}>{job.title}</td>
      <td style={{ borderRight: '1px solid #DADADA', color: '#106E00', fontWeight: 900 }}>{job.salary}</td>
      <td>
        {canApply ? (
          <button
            className="btn-toxic"
            style={{ fontSize: '0.5625rem', padding: '2px 8px' }}
            onClick={onApply}
          >
            QUERO SER EXPLORADO!
          </button>
        ) : (
          <span className="tb-label-sm" style={{ color: '#6E7979', fontSize: '0.5rem' }}>
            (só operários candidatam)
          </span>
        )}
      </td>
    </tr>
  );
}
