import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from 'wasp/client/auth';
import '../../theme/toxicBureaucracy.css';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        background: '#008080', // Teal desktop
      }}
      className="teal-desktop"
    >
      <div className="pixel-grid-overlay" style={{ pointerEvents: 'none' }} />

      {/* Ícones flutuantes decorativos */}
      <div style={{ position: 'absolute', top: '5%', left: '5%', opacity: 0.1, pointerEvents: 'none' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '200px', color: '#38FE13' }}>delete_forever</span>
      </div>
      <div style={{ position: 'absolute', bottom: '5%', right: '5%', opacity: 0.1, pointerEvents: 'none' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '240px', color: '#38FE13' }}>monetization_on</span>
      </div>

      <main
        className="win95-window"
        style={{
          width: '100%',
          maxWidth: '800px',
          boxShadow: 'inset 2px 2px 0px #FFFFFF, inset -2px -2px 0px #808080, 16px 16px 0px 0px rgba(0,0,0,0.4)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <header className="win95-titlebar" style={{ padding: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined filled" style={{ color: '#38FE13', fontSize: '20px' }}>water_drop</span>
            <h1 className="win95-titlebar-text" style={{ fontSize: '1rem' }}>Esgotin_Initiative.exe</h1>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button className="win95-titlebar-btn" style={{ padding: '0 8px' }}>_</button>
            <button className="win95-titlebar-btn" style={{ padding: '0 8px' }}>X</button>
          </div>
        </header>

        <div style={{ padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: '#EEEEEE' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <span className="material-symbols-outlined filled" style={{ fontSize: '64px', color: '#106E00' }}>pest_control_rodent</span>
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 900,
                fontSize: '4.5rem',
                color: '#38FE13',
                textTransform: 'uppercase',
                letterSpacing: '-0.05em',
                textShadow: '4px 4px 0px rgba(0,0,0,1)',
                margin: 0,
                lineHeight: 1,
              }}
            >
              ESGOTIN
            </h1>
          </div>

          <div style={{ background: '#000080', padding: '16px', width: '100%', maxWidth: '600px', marginBottom: '40px', border: '2px solid #000000', boxShadow: 'inset 2px 2px 0px rgba(255,255,255,0.2)' }}>
            <p
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: '1rem',
                fontWeight: 700,
                color: '#FFFFFF',
                margin: 0,
                lineHeight: 1.5,
                textTransform: 'uppercase',
              }}
            >
              <span style={{ color: '#38FE13' }}>&gt;</span> Sua solução antiética para desafortunados buscando serem explorados e empresários desalmados que não têm medo de serem processados por danos morais!
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/login')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 32px',
              background: '#38FE13',
              boxShadow: 'inset 2px 2px 0px #79FF5B, inset -2px -2px 0px #095300, 4px 4px 0px 0px rgba(0,0,0,1)',
              border: '2px solid #000',
              cursor: 'pointer',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 900,
              fontSize: '1.25rem',
              textTransform: 'uppercase',
              color: '#107100',
              transition: 'transform 0.1s',
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translate(2px, 2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'inset 2px 2px 0px #095300, inset -2px -2px 0px #79FF5B, 2px 2px 0px 0px rgba(0,0,0,1)';
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translate(0, 0)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'inset 2px 2px 0px #79FF5B, inset -2px -2px 0px #095300, 4px 4px 0px 0px rgba(0,0,0,1)';
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>login</span>
            Acessar o Esgoto Corporativo
          </button>
        </div>

        <footer
          className="status-bar"
          style={{ justifyContent: 'center' }}
        >
          <div className="status-bar-pane grow" style={{ textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif", color: '#3E4949' }}>
            Aviso: O uso contínuo pode resultar em perda irreversível de dignidade.
          </div>
        </footer>
      </main>
      
      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          fontFamily: "'Courier New', monospace",
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.6)',
          textTransform: 'uppercase',
        }}
      >
        ESGOTIN OS v1.0.0 — ABANDONE TODA ESPERANÇA
      </div>
    </div>
  );
}
