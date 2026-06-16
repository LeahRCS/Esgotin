import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { signup, useAuth } from 'wasp/client/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { InsetInput } from '../../components/ui/InsetInput';
import { BevelButton } from '../../components/ui/BevelButton';
import '../../theme/toxicBureaucracy.css';

const signupSchema = z.object({
  username: z.string().email('O e-mail é obrigatório e deve ser válido.'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
  role: z.enum(['WORKER', 'CORPORATE']),
  document: z.string().min(11, 'O documento deve ter no mínimo 11 caracteres.'),
  name: z.string().optional(),
  accepted: z.boolean().refine((val) => val === true, {
    message: 'Você deve aceitar ceder a sua alma.',
  }),
}).superRefine((data, ctx) => {
  if (data.role === 'WORKER') {
    if (!data.name || data.name.trim().length < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['name'],
        message: 'Operários devem fornecer o nome completo.',
      });
    }
  }
});

type SignupFormInputs = z.infer<typeof signupSchema>;

export function SignupPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const { data: user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/iscas', { replace: true });
    }
  }, [user, isLoading, navigate]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
      role: 'WORKER',
      document: '',
      name: '',
      accepted: false,
    },
  });

  const accepted = watch('accepted');
  const role = watch('role');

  async function onSubmit(data: SignupFormInputs) {
    setServerError(null);
    try {
      await signup({ 
        username: data.username, 
        password: data.password,
        role: data.role,
        document: data.document,
        name: data.name
      });
      navigate('/iscas');
    } catch (err: any) {
      if (err.message?.includes('already exists')) {
        setServerError('Este identificador já foi escravizado. Tente outro.');
      } else {
        setServerError('Falha ao processar admissão. O sistema te rejeitou.');
      }
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
        <span className="material-symbols-outlined" style={{ fontSize: '160px', color: '#38FE13' }}>group_add</span>
      </div>
      <div style={{ position: 'absolute', bottom: '40px', left: '40px', opacity: 0.15, pointerEvents: 'none', transform: 'rotate(180deg)' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '160px', color: '#38FE13' }}>receipt_long</span>
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
        Formulário F-802: Renúncia de Direitos
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
              <span className="material-symbols-outlined filled" style={{ color: '#38FE13', fontSize: '16px' }}>person_add</span>
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
              ESGOTIN — ADMISSÃO
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button 
              className="win95-titlebar-btn" 
              type="button" 
              onClick={() => navigate('/login')} 
              title="Já fui enganado antes (Voltar para o Login)"
              style={{ display: 'flex', alignItems: 'center', padding: '0 4px', gap: '0px', width: 'auto' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>close</span>
            </button>
          </div>
        </header>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', background: '#EEEEEE' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ position: 'relative', flexShrink: 0, width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined filled" style={{ fontSize: '56px', color: '#1A1C1C' }}>contract</span>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '8px', paddingLeft: '8px' }}>
                <span className="material-symbols-outlined filled" style={{ fontSize: '24px', color: '#BA1A1A' }}>edit_document</span>
              </div>
            </div>
            <div style={{ flex: 1, paddingTop: '4px' }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem', textTransform: 'uppercase', lineHeight: 1.2, color: '#1A1C1C', margin: '0 0 4px 0' }}>
                Assinatura de Contrato:<br />
                <span style={{ color: '#BA1A1A' }}>Vínculo Vitalício</span>
              </h2>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.6875rem', color: '#3E4949', margin: 0 }}>
                Preencha os dados para gerar sua matrícula. Não nos responsabilizamos por perdas de sanidade.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label htmlFor="username" className="tb-label-sm" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#3E4949', marginBottom: '4px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>email</span>
                E-mail
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
                <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>key</span>
                Senha (Não será criptografada mentalmente)
              </label>
              <InsetInput
                id="password"
                type="password"
                placeholder="No mínimo 6 caracteres..."
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px 0' }}>
              <span className="tb-label-sm" style={{ color: '#3E4949', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>work</span>
                Selecione seu destino na empresa
              </span>
              <div style={{ display: 'flex', gap: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="radio" value="WORKER" {...register('role')} style={{ accentColor: '#106E00' }} />
                  <span className="tb-label-sm" style={{ color: '#1A1C1C' }}>Operário (Ser explorado)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="radio" value="CORPORATE" {...register('role')} style={{ accentColor: '#106E00' }} />
                  <span className="tb-label-sm" style={{ color: '#1A1C1C' }}>Corporativo (Moer almas)</span>
                </label>
              </div>
              {errors.role && (
                <span style={{ fontSize: '0.6875rem', color: '#BA1A1A', marginTop: '4px', display: 'block', fontWeight: 'bold' }}>
                  {errors.role.message}
                </span>
              )}
            </div>

            {role === 'WORKER' && (
              <div>
                <label htmlFor="name" className="tb-label-sm" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#3E4949', marginBottom: '4px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>person</span>
                  Nome Completo
                </label>
                <InsetInput
                  id="name"
                  type="text"
                  placeholder="EX: João da Silva"
                  {...register('name')}
                  hasError={!!errors.name}
                  aria-invalid={!!errors.name}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <span style={{ fontSize: '0.6875rem', color: '#BA1A1A', marginTop: '4px', display: 'block', fontWeight: 'bold' }}>
                    {errors.name.message}
                  </span>
                )}
              </div>
            )}

            <div>
              <label htmlFor="document" className="tb-label-sm" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#3E4949', marginBottom: '4px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>badge</span>
                {role === 'WORKER' ? 'Seu CPF' : 'CNPJ ou CPF'}
              </label>
              <InsetInput
                id="document"
                type="text"
                placeholder={role === 'WORKER' ? "Somente números" : "CNPJ/CPF da Empresa"}
                {...register('document')}
                hasError={!!errors.document}
                aria-invalid={!!errors.document}
                disabled={isSubmitting}
              />
              {errors.document && (
                <span style={{ fontSize: '0.6875rem', color: '#BA1A1A', marginTop: '4px', display: 'block', fontWeight: 'bold' }}>
                  {errors.document.message}
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
                  Estou ciente e aceito vender minha alma à empresa
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
              <BevelButton type="button" onClick={() => navigate('/login')} disabled={isSubmitting}>
                Fugir
              </BevelButton>
              <BevelButton
                type="submit"
                variant="default"
                disabled={isSubmitting}
                icon={isSubmitting ? "hourglass_empty" : "draw"}
                style={{ color: '#106E00', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900 }}
              >
                {isSubmitting ? 'Processando...' : 'Assinar Contrato'}
              </BevelButton>
            </div>
          </form>

          {/* Botão Voltar pro Login */}
          <div style={{ textAlign: 'center', paddingTop: '4px' }}>
            <button
              type="button"
              onClick={() => navigate('/login')}
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
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>login</span>
              Já tenho uma matrícula (Login)
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
            Processo de Admissão N-32
          </p>
        </footer>
      </main>
    </div>
  );
}
