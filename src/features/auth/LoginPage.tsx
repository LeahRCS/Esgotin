import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { login, useAuth } from 'wasp/client/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { InsetInput } from '../../components/ui/InsetInput';
import { BevelButton } from '../../components/ui/BevelButton';
import '../../theme/toxicBureaucracy.css';

const loginSchema = z.object({
  username: z.string().min(1, 'O identificador é obrigatório.'),
  password: z.string().min(1, 'A senha é obrigatória.'),
  accepted: z.boolean().refine((val) => val === true, {
    message: 'Você deve aceitar ser explorado.',
  }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const { data: user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      if (user.role === 'ADMIN') navigate('/olimpo', { replace: true });
      else if (user.role === 'CORPORATE') navigate('/lancar-isca', { replace: true });
      else navigate('/iscas', { replace: true });
    }
  }, [user, isLoading, navigate]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
      accepted: false,
    },
  });

  const accepted = watch('accepted');

  async function onSubmit(data: LoginFormInputs) {
    setServerError(null);
    try {
      await login({ username: data.username, password: data.password });
      const u = data.username.trim().toLowerCase();
      if (u === 'esgoto_root') navigate('/olimpo');
      else if (u === 'rato_corporativo') navigate('/lancar-isca');
      else navigate('/iscas');
    } catch (err: any) {
      setServerError('Acesso negado. O esgoto rejeitou você.');
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif",
      }}
      className="teal-desktop"
    >
      {/* Background decorative icons */}
      <div style={{ position: 'absolute', top: '40px', right: '40px', opacity: 0.15, pointerEvents: 'none' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '160px', color: '#38FE13' }}>hub</span>
      </div>
      <div style={{ position: 'absolute', bottom: '40px', left: '40px', opacity: 0.15, pointerEvents: 'none', transform: 'rotate(180deg)' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '160px', color: '#38FE13' }}>biotech</span>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.625rem',
          color: 'rgba(255,255,255,0.4)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        System Error: Hope Not Found [0x000006E]
      </div>

      <main
        className="win95-window"
        style={{ width: '100%', maxWidth: '420px', boxShadow: 'inset 2px 2px 0px #FFFFFF, inset -2px -2px 0px #808080, 4px 4px 0px 0px rgba(0,0,0,0.3)' }}
      >
        <header
          style={{
            background: 'linear-gradient(90deg, #000080 0%, #474EB7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '4px 8px',
            height: '36px',
            borderBottomWidth: '2px',
            borderBottomStyle: 'solid',
            borderBottomColor: 'rgba(255,255,255,0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
              <span className="material-symbols-outlined filled" style={{ color: '#38FE13', fontSize: '16px' }}>fluid</span>
            </div>
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 900,
                fontSize: '0.875rem',
                color: '#38FE13',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                textShadow: '1px 1px 0px rgba(0,0,0,1)',
                margin: 0,
              }}
            >
              ESGOTIN — AUTENTICAÇÃO
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button 
              className="win95-titlebar-btn" 
              type="button" 
              onClick={() => navigate('/')} 
              title="Fugir para a Landing Page"
              style={{ display: 'flex', alignItems: 'center', padding: '0 4px', gap: '0px', width: 'auto' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>directions_run</span>
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>door_open</span>
            </button>
          </div>
        </header>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', background: '#EEEEEE' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ position: 'relative', flexShrink: 0, width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined filled" style={{ fontSize: '56px', color: '#EAB308' }}>warning</span>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '8px' }}>
                <span className="material-symbols-outlined filled" style={{ fontSize: '24px', color: '#106E00' }}>pest_control_rodent</span>
              </div>
            </div>
            <div style={{ flex: 1, paddingTop: '4px' }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem', textTransform: 'uppercase', lineHeight: 1.2, color: '#1A1C1C', margin: '0 0 4px 0' }}>
                Protocolo de Acesso:<br />
                <span style={{ color: '#474EB7' }}>Mão de Obra e Burguesia</span>
              </h2>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.6875rem', color: '#3E4949', margin: 0 }}>
                Insira as credenciais para fazer parte do processamento de dejetos corporativos.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label htmlFor="username" className="tb-label-sm" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#3E4949', marginBottom: '4px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>account_circle</span>
                E-mail ou Identificador
              </label>
              <InsetInput
                id="username"
                type="text"
                placeholder="EX: operario@esgotin.com"
                {...register('username')}
                hasError={!!errors.username}
                aria-invalid={!!errors.username}
                aria-describedby={errors.username ? "username-error" : undefined}
                disabled={isSubmitting}
              />
              {errors.username && (
                <span id="username-error" style={{ fontSize: '0.6875rem', color: '#BA1A1A', marginTop: '4px', display: 'block', fontWeight: 'bold' }}>
                  {errors.username.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="password" className="tb-label-sm" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#3E4949', marginBottom: '4px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>lock</span>
                Código de Submissão
              </label>
              <InsetInput
                id="password"
                type="password"
                placeholder="********"
                {...register('password')}
                hasError={!!errors.password}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
                disabled={isSubmitting}
              />
              {errors.password && (
                <span id="password-error" style={{ fontSize: '0.6875rem', color: '#BA1A1A', marginTop: '4px', display: 'block', fontWeight: 'bold' }}>
                  {errors.password.message}
                </span>
              )}
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    background: '#FFFFFF',
                    boxShadow: 'inset 2px 2px 0px #808080, inset -2px -2px 0px #FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    cursor: 'pointer',
                    opacity: isSubmitting ? 0.5 : 1,
                  }}
                  onClick={() => !isSubmitting && setValue('accepted', !accepted, { shouldValidate: true })}
                  role="checkbox"
                  aria-checked={accepted}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (!isSubmitting) setValue('accepted', !accepted, { shouldValidate: true });
                    }
                  }}
                >
                  {accepted && (
                    <span className="material-symbols-outlined" style={{ fontSize: '12px', color: '#106E00' }}>check</span>
                  )}
                </div>
                <span className="tb-label-sm" style={{ color: '#3E4949' }}>
                  Aceito ser explorado por tempo indeterminado
                </span>
              </label>
              {errors.accepted && (
                <span style={{ fontSize: '0.6875rem', color: '#BA1A1A', marginTop: '4px', display: 'block', fontWeight: 'bold' }}>
                  {errors.accepted.message}
                </span>
              )}
            </div>

            {serverError && (
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.6875rem', color: '#BA1A1A', fontWeight: 700, textTransform: 'uppercase', margin: 0 }}>
                ⚠ {serverError}
              </p>
            )}

            <div style={{ display: 'flex', gap: '8px', paddingTop: '8px', justifyContent: 'flex-end' }}>
              <BevelButton type="button" onClick={() => window.history.back()} disabled={isSubmitting}>
                Abortar
              </BevelButton>
              <BevelButton
                type="submit"
                variant="default"
                disabled={isSubmitting}
                icon={isSubmitting ? "hourglass_empty" : "terminal"}
                style={{ color: '#106E00', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900 }}
              >
                {isSubmitting ? 'Conectando...' : 'Conectar...'}
              </BevelButton>
            </div>
          </form>

          {/* Botão Espiadinha */}
          <div style={{ textAlign: 'center', paddingTop: '4px' }}>
            <button
              type="button"
              onClick={() => navigate('/espiada')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: '#474EB7',
                textDecoration: 'underline',
                textTransform: 'uppercase',
                padding: '4px 8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#38FE13'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#474EB7'; }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>visibility</span>
              Dar uma espiadinha
            </button>
          </div>

          <div style={{ textAlign: 'center', paddingTop: '0px' }}>
            <button
              type="button"
              onClick={() => navigate('/cadastro')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: '#BA1A1A',
                textDecoration: 'underline',
                textTransform: 'uppercase',
                padding: '4px 8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#000000'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#BA1A1A'; }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>person_add</span>
              Ainda não foi sugado pelo sistema? (Cadastro)
            </button>
          </div>
        </div>

        <footer
          style={{
            height: '32px',
            background: '#DADADA',
            borderTop: '2px solid rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
          }}
        >
          <p className="tb-label-sm" style={{ color: '#3E4949', opacity: 0.6, margin: 0 }}>
            Status: Sistema de Esgoto Operacional
          </p>
        </footer>
      </main>
    </div>
  );
}
