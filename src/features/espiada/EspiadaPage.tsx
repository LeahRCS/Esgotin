import React from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useQuery } from 'wasp/client/operations';
import { getIscasPublic } from 'wasp/client/operations';
import type { Job } from 'wasp/entities';
import { Win95Window } from '../../components/shell/Win95Window';
import { BevelButton } from '../../components/ui/BevelButton';
import '../../theme/toxicBureaucracy.css';

export function EspiadaPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = (searchParams.get('q') || '').toLowerCase();

  const { data, isLoading, error, refetch } = useQuery(getIscasPublic);
  const iscas = (data ?? []) as Job[];
  const filteredIscas = iscas.filter(job =>
    job.title.toLowerCase().includes(q) || job.companyName.toLowerCase().includes(q)
  );

  return (
    <div className="app-layout">
      {/* TopAppBar simplificada para visitante */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '40px',
          zIndex: 50,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 8px',
          background: 'linear-gradient(90deg, #000080 0%, #474EB7 100%)',
          borderBottom: '2px solid rgba(255,255,255,0.2)',
          boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span className="material-symbols-outlined filled" style={{ color: '#38FE13', fontSize: '20px' }}>
            water_drop
          </span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.25rem',
              fontWeight: 900,
              color: '#38FE13',
              textTransform: 'uppercase',
              letterSpacing: '-0.05em',
              textShadow: '2px 2px 0px rgba(0,0,0,1)',
            }}
          >
            ESGOTIN
          </span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.5625rem',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
              marginLeft: '4px',
            }}
          >
            — modo espiadinha
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Busca */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(0,0,0,0.2)',
              boxShadow: 'inset 2px 2px 0px #808080, inset -2px -2px 0px #FFFFFF',
              height: '24px',
              padding: '0 6px',
              gap: '4px',
            }}
          >
            <span className="material-symbols-outlined" style={{ color: '#38FE13', fontSize: '14px' }}>
              search
            </span>
            <input
              type="text"
              placeholder="Buscar esgoto..."
              value={searchParams.get('q') || ''}
              onChange={(e) => {
                if (e.target.value) {
                  searchParams.set('q', e.target.value);
                } else {
                  searchParams.delete('q');
                }
                setSearchParams(searchParams, { replace: true });
              }}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '0.6875rem',
                color: '#FFFFFF',
                width: '140px',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            />
          </div>

          {/* Botão Fazer Login */}
          <button
            type="button"
            onClick={() => navigate('/login')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              background: '#38FE13',
              boxShadow: 'inset 2px 2px 0px #79FF5B, inset -2px -2px 0px #095300',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 900,
              fontSize: '0.625rem',
              textTransform: 'uppercase',
              color: '#107100',
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = 'inset 2px 2px 0px #095300, inset -2px -2px 0px #79FF5B';
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = 'inset 2px 2px 0px #79FF5B, inset -2px -2px 0px #095300';
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>login</span>
            Fazer Login
          </button>
        </div>
      </header>

      {/* Body — sem BottomNavBar */}
      <div style={{ marginTop: '40px', height: 'calc(100vh - 40px)', overflow: 'auto' }}>
        <main className="teal-desktop" style={{ position: 'relative', minHeight: '100%', padding: '16px' }}>
          <div className="pixel-grid-overlay" />
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', maxWidth: '860px' }}>
            <Win95Window
              title="Espiada_Corporativa.exe — [MODO VISITANTE]"
              icon="visibility"
              menuItems={['Arquivo', 'Visualizar', 'Ajuda']}
              toolbar={
                <BevelButton icon="refresh" onClick={() => refetch()}>
                  Atualizar Esgoto
                </BevelButton>
              }
              statusBarItems={[
                { label: `${iscas.length} Vagas Detetadas`, grow: false },
                { label: '👀 Modo Espiadinha' },
                { label: '🐀 Faça login para interagir' },
              ]}
              style={{ flex: 1 }}
            >
              <div style={{ flex: 1, overflow: 'auto', background: '#FFFFFF', boxShadow: 'inset 2px 2px 0px #808080, inset -2px -2px 0px #FFFFFF', position: 'relative' }}>
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
                        <th style={{ width: '22%' }}>Espiar</th>
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
                        <tr
                          key={job.id}
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(56,254,19,0.06)')}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '')}
                          onClick={() => navigate(`/espiada/${job.id}`)}
                        >
                          <td style={{ borderRight: '1px solid #DADADA', fontWeight: 700 }}>{job.companyName}</td>
                          <td style={{ borderRight: '1px solid #DADADA' }}>{job.title}</td>
                          <td style={{ borderRight: '1px solid #DADADA', color: '#106E00', fontWeight: 900 }}>{job.salary}</td>
                          <td>
                            <button
                              className="btn-toxic"
                              style={{ fontSize: '0.5625rem', padding: '2px 8px' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/espiada/${job.id}`);
                              }}
                            >
                              👀 ESPIAR
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </Win95Window>
          </div>
        </main>
      </div>
    </div>
  );
}
