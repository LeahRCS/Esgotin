import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAuth } from 'wasp/client/auth';
import { roleOf } from '../../auth/roles';
import { AppShell } from '../../components/shell/AppShell';
import { BevelButton } from '../../components/ui/BevelButton';
import { InsetTextarea } from '../../components/ui/InsetInput';
import { useContratoInfamia } from './useContratoInfamia';

export function ContratoInfamiaPage() {
  const { jobId }   = useParams<{ jobId: string }>();
  const navigate    = useNavigate();
  const jobIdNum    = Number(jobId);
  const { data: user } = useAuth();
  const isWorker = roleOf(user ?? null) === 'WORKER';

  const { job, isLoading, error, applyToJob } = useContratoInfamia(jobIdNum);
  const [coverLetter, setCoverLetter]          = useState('');
  const [submitted, setSubmitted]              = useState(false);
  const [submitting, setSubmitting]            = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await applyToJob(coverLetter);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <AppShell>
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#EEEEEE', boxShadow: 'inset 2px 2px 0px #FFFFFF, inset -2px -2px 0px #808080, 8px 8px 0px 0px rgba(0,0,0,0.3)', maxWidth: '400px', width: '100%' }}>
            <div className="win95-titlebar"><span className="win95-titlebar-text">Candidatura Registrada</span></div>
            <div style={{ padding: '24px', textAlign: 'center' }}>
              <span className="material-symbols-outlined filled" style={{ fontSize: '64px', color: '#38FE13', display: 'block', marginBottom: '12px' }}>check_circle</span>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, textTransform: 'uppercase', color: '#1A1C1C', marginBottom: '16px' }}>
                Sua miséria foi registrada com sucesso!<br />
                <span style={{ color: '#106E00' }}>Aguarde o RH te ignorar.</span>
              </p>
              <BevelButton onClick={() => navigate('/iscas')} icon="arrow_back" fullWidth>
                Voltar para o Esgoto
              </BevelButton>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      {/* Modal overlay */}
      <div style={{ position: 'fixed', inset: '40px 0 48px 0', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(1px)', zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
        <main style={{ width: '100%', maxWidth: '640px', background: '#EEEEEE', boxShadow: 'inset 2px 2px 0px #FFFFFF, inset -2px -2px 0px #808080, 8px 8px 0px 0px rgba(0,0,0,0.3)', position: 'relative' }}>
          {/* Background pixel noise */}
          <div className="pixel-grid-overlay" />

          {/* Title Bar */}
          <header className="win95-titlebar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="material-symbols-outlined filled" style={{ color: '#38FE13', fontSize: '16px' }}>warning</span>
              <h1 className="win95-titlebar-text">Contrato_de_Exploração.exe</h1>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button className="win95-titlebar-btn">_</button>
              <button className="win95-titlebar-btn" onClick={() => navigate(-1)}>X</button>
            </div>
          </header>

          {/* Content */}
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {isLoading && <div className="tb-label-sm" style={{ color: '#3E4949' }}>Carregando especificações da vaga...</div>}

            {!isLoading && !job && (
              <div style={{ background: '#FAFAFA', padding: '32px', textAlign: 'center', border: '2px dashed #BA1A1A' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#BA1A1A', marginBottom: '16px' }}>error</span>
                <h2 className="tb-headline-lg" style={{ color: '#BA1A1A', marginBottom: '8px' }}>VAGA INEXISTENTE</h2>
                <p className="tb-body-md" style={{ color: '#3E4949' }}>A vaga que você tenta acessar já foi ocupada ou foi deletada pelo sistema.</p>
              </div>
            )}

            {job && (
              <>
                {/* Job Description */}
                <section>
                  <label className="tb-label-sm" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#3E4949', marginBottom: '6px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>description</span>
                    Especificações da Vaga Insalubre
                  </label>
                  <div style={{ background: '#FFFFFF', boxShadow: 'inset 2px 2px 0px #808080, inset -2px -2px 0px #FFFFFF', padding: '16px', maxHeight: '180px', overflowY: 'auto', fontFamily: "'Courier New', monospace", fontSize: '0.8125rem', color: '#1A1C1C', lineHeight: 1.6 }}>
                    <p style={{ color: '#106E00', fontWeight: 700, marginBottom: '12px' }}>ID_PROTOCOLO: {job.code}</p>
                    <p style={{ fontStyle: 'italic', marginBottom: '12px' }}>{job.description}</p>
                    {job.requirements.split('\n').filter(Boolean).map((req, i) => (
                      <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                        <span style={{ color: '#BA1A1A', fontWeight: 700 }}>[!]</span>
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Bio-hazard warning */}
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

                {/* Cover Letter Form — apenas operários */}
                {isWorker ? (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label className="tb-label-sm" style={{ color: '#3E4949', display: 'block', marginBottom: '4px' }}>
                        Carta de Miséria (Por que você merece o lodo?)
                      </label>
                      <InsetTextarea
                        rows={5}
                        placeholder="Implore aqui por sua vaga no ecossistema ESGOTIN..."
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        required
                      />
                    </div>

                    <div style={{ borderBottom: '2px solid rgba(186,26,26,0.4)', paddingBottom: '4px' }}>
                      <span className="tb-label-sm" style={{ color: '#BA1A1A' }}>Assinatura em Sangue Digital:</span>
                    </div>
                    <p className="tb-label-sm" style={{ color: 'rgba(62,73,73,0.6)', textAlign: 'right', marginTop: '-8px' }}>
                      Documento validado pelo Protocolo-95
                    </p>

                    <button
                      type="submit"
                      disabled={submitting}
                      style={{
                        width: '100%',
                        height: '56px',
                        background: '#38FE13',
                        boxShadow: 'inset 2px 2px 0px #79FF5B, inset -2px -2px 0px #095300',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 900,
                        fontSize: '1.125rem',
                        textTransform: 'uppercase',
                        color: '#107100',
                      }}
                      onMouseDown={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'translate(1px,1px)';
                        (e.currentTarget as HTMLElement).style.boxShadow = 'inset 2px 2px 0px #000000, inset -1px -1px 0px #FFFFFF';
                      }}
                      onMouseUp={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = '';
                        (e.currentTarget as HTMLElement).style.boxShadow = 'inset 2px 2px 0px #79FF5B, inset -2px -2px 0px #095300';
                      }}
                    >
                      <span className="material-symbols-outlined">gavel</span>
                      {submitting ? 'Enviando para o esgoto...' : 'Aceitar termos abusivos'}
                    </button>
                  </form>
                ) : (
                  <p className="tb-label-sm" style={{ color: '#000080', margin: 0 }}>
                    Contas corporativas ou administrativas não se candidatam aqui — volte ao painel adequado ao seu nível de parasitismo.
                  </p>
                )}
              </>
            )}
          </div>

          {/* Status Bar */}
          <footer className="status-bar">
            <div className="status-bar-pane">
              <div className="status-dot-active" />
              Status: Decompondo
            </div>
            <div className="status-bar-pane grow">User: EXPLORADO_#0921</div>
            <div className="status-bar-pane">100% TÓXICO</div>
          </footer>
        </main>
      </div>
    </AppShell>
  );
}
