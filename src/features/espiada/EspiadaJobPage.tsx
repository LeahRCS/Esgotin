import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from 'wasp/client/operations';
import { getJobDetailPublic } from 'wasp/client/operations';
import '../../theme/toxicBureaucracy.css';

export function EspiadaJobPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const jobIdNum = Number(jobId);

  const { data: job, isLoading } = useQuery(getJobDetailPublic, { jobId: jobIdNum });

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
          {/* Botão voltar */}
          <button
            type="button"
            onClick={() => navigate('/espiada')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 8px',
              background: '#DADADA',
              boxShadow: 'inset 2px 2px 0px #FFFFFF, inset -2px -2px 0px #808080',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '0.625rem',
              textTransform: 'uppercase',
              color: '#1A1C1C',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_back</span>
            Voltar
          </button>

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

      {/* Body */}
      <div style={{ marginTop: '40px', height: 'calc(100vh - 40px)', overflow: 'auto' }}>
        <main className="teal-desktop" style={{ position: 'relative', minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div className="pixel-grid-overlay" />

          <div style={{ width: '100%', maxWidth: '640px', background: '#EEEEEE', boxShadow: 'inset 2px 2px 0px #FFFFFF, inset -2px -2px 0px #808080, 8px 8px 0px 0px rgba(0,0,0,0.3)', position: 'relative' }}>
            {/* Title Bar */}
            <header className="win95-titlebar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="material-symbols-outlined filled" style={{ color: '#38FE13', fontSize: '16px' }}>visibility</span>
                <h1 className="win95-titlebar-text">Espiadinha_Contrato.exe</h1>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button className="win95-titlebar-btn">_</button>
                <button className="win95-titlebar-btn" onClick={() => navigate('/espiada')}>X</button>
              </div>
            </header>

            {/* Content */}
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {isLoading && <div className="tb-label-sm" style={{ color: '#3E4949' }}>Carregando especificações da vaga...</div>}

              {!isLoading && !job && (
                <div style={{ background: '#FAFAFA', padding: '32px', textAlign: 'center', border: '2px dashed #BA1A1A' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#BA1A1A', marginBottom: '16px' }}>error</span>
                  <h2 className="tb-headline-lg" style={{ color: '#BA1A1A', marginBottom: '8px' }}>VAGA INEXISTENTE</h2>
                  <p className="tb-body-md" style={{ color: '#3E4949' }}>A vaga que você tenta espiar já foi ocupada ou foi deletada pelo sistema.</p>
                </div>
              )}

              {job && (
                <>
                  {/* Job Description — totalmente visível */}
                  <section>
                    <label className="tb-label-sm" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#3E4949', marginBottom: '6px' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>description</span>
                      Especificações da Vaga Insalubre
                    </label>
                    <div style={{ background: '#FFFFFF', boxShadow: 'inset 2px 2px 0px #808080, inset -2px -2px 0px #FFFFFF', padding: '16px', maxHeight: '180px', overflowY: 'auto', fontFamily: "'Courier New', monospace", fontSize: '0.8125rem', color: '#1A1C1C', lineHeight: 1.6 }}>
                      <p style={{ color: '#106E00', fontWeight: 700, marginBottom: '12px' }}>ID_PROTOCOLO: {job.code}</p>
                      <p style={{ fontStyle: 'italic', marginBottom: '12px' }}>{job.description}</p>
                      {job.requirements.split('\n').filter(Boolean).map((req: string, i: number) => (
                        <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                          <span style={{ color: '#BA1A1A', fontWeight: 700 }}>[!]</span>
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Bio-hazard warning — totalmente visível */}
                  <div style={{ background: 'rgba(56,254,19,0.08)', border: '2px dashed #106E00', padding: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ background: '#38FE13', padding: '8px', border: '2px solid #107100', flexShrink: 0 }}>
                      <span className="material-symbols-outlined filled" style={{ color: '#107100', fontSize: '28px' }}>biotech</span>
                    </div>
                    <div>
                      <h3 className="tb-label-sm" style={{ color: '#106E00', margin: '0 0 2px 0' }}>Aviso de Risco Biológico</h3>
                      <p className="tb-label-sm" style={{ color: '#3E4949', margin: 0, textTransform: 'none', fontWeight: 400, fontSize: '0.625rem' }}>
                        Ao clicar em aceitar, você renuncia sua sanidade e direitos humanos básicos.
                      </p>
                    </div>
                  </div>

                  {/* Seção de candidatura — BORRADA com overlay */}
                  <div style={{ position: 'relative' }}>
                    {/* Formulário fantasma (borrado) */}
                    <div style={{ filter: 'blur(4px)', pointerEvents: 'none', userSelect: 'none' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                          <label className="tb-label-sm" style={{ color: '#3E4949', display: 'block', marginBottom: '4px' }}>
                            Carta de Miséria (Por que você merece o lodo?)
                          </label>
                          <div style={{
                            width: '100%',
                            height: '100px',
                            background: '#FFFFFF',
                            boxShadow: 'inset 2px 2px 0px #808080, inset -2px -2px 0px #FFFFFF',
                            padding: '8px',
                            fontFamily: "'Courier New', monospace",
                            fontSize: '0.8125rem',
                            color: '#808080',
                          }}>
                            Implore aqui por sua vaga no ecossistema ESGOTIN...
                          </div>
                        </div>

                        <div style={{ borderBottom: '2px solid rgba(186,26,26,0.4)', paddingBottom: '4px' }}>
                          <span className="tb-label-sm" style={{ color: '#BA1A1A' }}>Assinatura em Sangue Digital:</span>
                        </div>

                        <div style={{
                          width: '100%',
                          height: '56px',
                          background: '#38FE13',
                          boxShadow: 'inset 2px 2px 0px #79FF5B, inset -2px -2px 0px #095300',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '12px',
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontWeight: 900,
                          fontSize: '1.125rem',
                          textTransform: 'uppercase',
                          color: '#107100',
                        }}>
                          <span className="material-symbols-outlined">gavel</span>
                          Aceitar termos abusivos
                        </div>
                      </div>
                    </div>

                    {/* Overlay com mensagem */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      zIndex: 10,
                    }}>
                      <div style={{
                        background: '#EEEEEE',
                        border: '2px solid #808080',
                        boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.4)',
                        padding: '16px 20px',
                        textAlign: 'center',
                        maxWidth: '320px',
                      }}>
                        <span className="material-symbols-outlined filled" style={{ fontSize: '32px', color: '#EAB308', display: 'block', marginBottom: '8px' }}>
                          lock
                        </span>
                        <p style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontWeight: 700,
                          fontSize: '0.8125rem',
                          color: '#1A1C1C',
                          textTransform: 'uppercase',
                          margin: '0 0 4px 0',
                        }}>
                          Você precisa fazer login para realizar esta ação, seu ratinho curioso! 🐀
                        </p>
                        <p style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: '0.625rem',
                          color: '#3E4949',
                          margin: '0 0 12px 0',
                        }}>
                          Crie uma conta ou entre no sistema para se candidatar às vagas do esgoto.
                        </p>
                        <button
                          type="button"
                          onClick={() => navigate('/login')}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            justifyContent: 'center',
                            width: '100%',
                            padding: '8px 12px',
                            background: '#38FE13',
                            boxShadow: 'inset 2px 2px 0px #79FF5B, inset -2px -2px 0px #095300',
                            border: 'none',
                            cursor: 'pointer',
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 900,
                            fontSize: '0.75rem',
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
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>login</span>
                          Fazer Login
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Status Bar */}
            <footer className="status-bar">
              <div className="status-bar-pane">
                <div className="status-dot-active" />
                Status: Espiando
              </div>
              <div className="status-bar-pane grow">Modo: VISITANTE (SEM LOGIN)</div>
              <div className="status-bar-pane">👀 ESPIADINHA</div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
