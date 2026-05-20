import React from 'react';
import { useSearchParams } from 'react-router';
import { AppShell } from '../../components/shell/AppShell';
import { RequireRole } from '../../components/auth/RequireRole';
import { BevelButton } from '../../components/ui/BevelButton';
import { useOlimpo } from './useOlimpo';
import type { Job } from 'wasp/entities';

export function OlimpoPage() {
  return (
    <RequireRole roles={['ADMIN']}>
      <OlimpoContent />
    </RequireRole>
  );
}

function OlimpoContent() {
  const [searchParams] = useSearchParams();
  const q = (searchParams.get('q') || '').toLowerCase();
  const { metrics, pendingJobs, isLoading, approveProtocol, rejectProtocol } = useOlimpo();

  const filteredPendingJobs = pendingJobs.filter(job => 
    job.title.toLowerCase().includes(q) || job.companyName.toLowerCase().includes(q) || String(job.code).toLowerCase().includes(q)
  );

  const pieData = React.useMemo(() => {
    const total = metrics?.totalApplications || 1; // fallback to 1 to avoid NaN
    const exploited = metrics?.exploitedCount || 0;
    const rejected = metrics?.rejectedCount || 0;
    const pending = Math.max(0, (metrics?.totalApplications || 0) - exploited - rejected);
    
    const pExploited = (exploited / total) * 100;
    const pRejected = (rejected / total) * 100;
    
    // Cores: Explorados = Verde Neon, Descartados = Vermelho, Fila = Cinza Escuro
    return `conic-gradient(#38FE13 0% ${pExploited}%, #BA1A1A ${pExploited}% ${pExploited + pRejected}%, #3E4949 ${pExploited + pRejected}% 100%)`;
  }, [metrics]);

  return (
    <AppShell>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', overflow: 'auto', padding: '4px' }}>
        {/* Metrics Panel */}
        <div
          style={{
            background: '#EEEEEE',
            boxShadow: 'inset 2px 2px 0px #FFFFFF, inset -2px -2px 0px #808080, 2px 2px 0px 0px rgba(0,0,0,0.2)',
            padding: '16px',
          }}
        >
          {/* Metrics header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="material-symbols-outlined" style={{ color: '#3E4949', fontSize: '18px' }}>pie_chart</span>
              <span className="tb-label-sm" style={{ color: '#3E4949', fontSize: '0.75rem' }}>
                MODERADOR — DESTINO DOS MISERÁVEIS (ESTADO DAS CANDIDATURAS)
              </span>
            </div>
            <span className="chip chip-pending" style={{ background: '#000080', color: '#FFFFFF' }}>BUILD: 0.9.5-TOXIC</span>
          </div>
          {/* Chart dynamic (Pie) */}
          <div style={{ display: 'flex', justifyContent: 'center', background: '#FFFFFF', boxShadow: 'inset 2px 2px 0px #808080, inset -2px -2px 0px #FFFFFF', marginBottom: '16px', padding: '24px', alignItems: 'center' }}>
            {/* Pie Circle */}
            <div style={{ 
              width: '120px', 
              height: '120px', 
              borderRadius: '50%', 
              background: pieData,
              boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              border: '2px solid #1A1C1C',
              flexShrink: 0
            }}></div>
          </div>
          {/* KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            <MetricCard label="Explorados"  value={`${metrics?.exploitedCount || 0}`}  color="#38FE13" />
            <MetricCard label="Descartados" value={`${metrics?.rejectedCount || 0}`}     color="#BA1A1A" />
            <MetricCard label="Fila do Moedor"  value={`${Math.max(0, (metrics?.totalApplications || 0) - (metrics?.exploitedCount || 0) - (metrics?.rejectedCount || 0))}`}  color="#3E4949" />
            <MetricCard label="Iscas Ativas"     value={`${metrics?.totalJobs ?? 0}`}          color="#38FE13" />
          </div>
        </div>

        {/* Pending Protocol Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
          {isLoading && (
            <div className="tb-label-sm" style={{ color: 'rgba(255,255,255,0.6)', padding: '16px' }}>
              Carregando protocolos...
            </div>
          )}
          {!isLoading && filteredPendingJobs.length === 0 && (
            <div
              className="tb-label-sm"
              style={{
                color: '#3E4949',
                padding: '16px',
                background: '#EEEEEE',
                boxShadow: 'inset 2px 2px 0px #FFFFFF, inset -2px -2px 0px #808080',
              }}
            >
              Nenhum protocolo na fila correspondente.
            </div>
          )}
          {filteredPendingJobs.map((job) => (
            <ProtocoloCard
              key={job.id}
              job={job}
              onApprove={() => approveProtocol(job.id)}
              onReject={()  => rejectProtocol(job.id)}
            />
          ))}
        </div>
      </div>
    </AppShell>
  );
}

function MetricCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <div className="tb-label-sm" style={{ color: '#3E4949', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: '2rem', color, lineHeight: 1 }}>{value}</div>
    </div>
  );
}

function ProtocoloCard({ job, onApprove, onReject }: { job: Job; onApprove: () => void; onReject: () => void }) {
  return (
    <div style={{ background: '#EEEEEE', boxShadow: 'inset 2px 2px 0px #FFFFFF, inset -2px -2px 0px #808080, 2px 2px 0px 0px rgba(0,0,0,0.2)' }}>
      {/* Card Title Bar */}
      <div className="win95-titlebar" style={{ height: '24px' }}>
        <span className="win95-titlebar-text" style={{ fontSize: '0.625rem' }}>PROTOCOLO APPROVAL_REQ #{job.id}</span>
        <div style={{ display: 'flex', gap: '2px' }}>
          <button className="win95-titlebar-btn" style={{ width: '16px', height: '16px', fontSize: '0.5rem' }}>□</button>
          <button className="win95-titlebar-btn" style={{ width: '16px', height: '16px', fontSize: '0.5rem' }}>□</button>
        </div>
      </div>
      {/* Card Body */}
      <div style={{ padding: '12px', display: 'flex', gap: '12px' }}>
        {/* Job icon */}
        <div style={{ width: '64px', height: '64px', background: '#DADADA', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="material-symbols-outlined filled" style={{ fontSize: '40px', color: '#474EB7' }}>work</span>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: '1rem', margin: '0 0 2px 0', color: '#1A1C1C' }}>{job.title}</h3>
          <p className="tb-label-sm" style={{ color: '#3E4949', margin: '0 0 8px 0' }}>EMPRESA: {job.companyName}</p>
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '8px' }}>
            {(job.tags ?? []).slice(0, 2).map((tag) => (
              <span key={tag} className="chip-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
      {/* Requirements */}
      <div style={{ margin: '0 12px 12px', background: '#F4F3F3', boxShadow: 'inset 1px 1px #808080', padding: '8px', fontFamily: "'Courier New', monospace", fontSize: '0.6875rem', color: '#3E4949' }}>
        [REQUISITOS] {job.requirements.slice(0, 120)}...
      </div>
      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px', padding: '0 12px 12px' }}>
        <BevelButton variant="toxic" icon="check_circle" style={{ flex: 1, justifyContent: 'center' }} onClick={onApprove}>
          PUBLICAR NO FEED
        </BevelButton>
        <BevelButton variant="danger" icon="cancel" style={{ flex: 1, justifyContent: 'center' }} onClick={onReject}>
          JOGAR NO FOSSO
        </BevelButton>
      </div>
    </div>
  );
}
