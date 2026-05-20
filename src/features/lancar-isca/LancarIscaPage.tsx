import React, { useState } from 'react';
import { AppShell } from '../../components/shell/AppShell';
import { RequireRole } from '../../components/auth/RequireRole';
import { Win95Window } from '../../components/shell/Win95Window';
import { InsetInput, InsetTextarea } from '../../components/ui/InsetInput';
import { BevelButton } from '../../components/ui/BevelButton';
import { useLancarIsca } from './useLancarIsca';
import { generateJobCode } from '../../utils/formatters';
import { jobStatusLabels } from '../../theme/tokens';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Job } from 'wasp/entities';

const lancarIscaSchema = z.object({
  code: z.string().min(1, 'O código é obrigatório.'),
  companyName: z.string().min(1, 'O nome da empresa é obrigatório.'),
  title: z.string().min(1, 'O cargo é obrigatório.'),
  salary: z.string().min(1, 'O salário é obrigatório.'),
  description: z.string().min(10, 'Descreva a vaga detalhadamente (min 10 caracteres).'),
  requirements: z.string().min(10, 'Especifique os requisitos abusivos (min 10 caracteres).'),
  tagsRaw: z.string(),
});

type LancarIscaInputs = z.infer<typeof lancarIscaSchema>;

export function LancarIscaPage() {
  return (
    <RequireRole roles={['CORPORATE']}>
      <LancarIscaContent />
    </RequireRole>
  );
}

function LancarIscaContent() {
  const { minhas, isLoading, refetch, submit } = useLancarIsca();
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LancarIscaInputs>({
    resolver: zodResolver(lancarIscaSchema),
    mode: 'onBlur',
    defaultValues: {
      code: generateJobCode('TOX'),
      companyName: '',
      title: '',
      salary: '',
      description: '',
      requirements: '',
      tagsRaw: 'INSALUBRIDADE, ZERO BENEFICIOS',
    },
  });


  async function onSubmit(data: LancarIscaInputs) {
    setMsg(null);
    try {
      const tags = data.tagsRaw
        .split(/[,;]/)
        .map((t) => t.trim())
        .filter(Boolean);
      await submit({
        code: data.code,
        companyName: data.companyName,
        title: data.title,
        salary: data.salary,
        description: data.description,
        requirements: data.requirements,
        tags,
        toxicityLevel: 95,
      });
      setMsg({ text: 'Protocolo enviado à Lama. Aguarde moderação do Ministério.', type: 'success' });
      await refetch();
      reset({ ...data, code: generateJobCode('TOX'), title: '', description: '', requirements: '' });
    } catch (err: unknown) {
      setMsg({ text: err instanceof Error ? err.message : 'Falha ao enfileirar na tubulação.', type: 'error' });
    }
  }

  return (
    <AppShell>
      <div style={{ maxWidth: '880px', height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Win95Window
          title="Lançar_Isca_Corporativa.exe"
          icon="post_add"
          menuItems={['Arquivo', 'Protocolo', 'Insalubridade', 'Ajuda']}
          statusBarItems={[
            { label: 'MODO: PREDADOR' },
            { label: 'Filas de aprovação ativas', grow: true },
          ]}
          style={{ flex: 1 }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              padding: '12px',
              overflow: 'auto',
              background: '#FFFFFF',
              boxShadow: 'inset 2px 2px 0px #808080, inset -2px -2px 0px #FFFFFF',
            }}
          >
            <p className="tb-label-sm" style={{ color: '#3E4949', margin: 0 }}>
              Preencha o formulário. A vaga só aparece para ratos operários depois que o moderador aprovar na Lama.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <label htmlFor="code" className="tb-label-sm" style={{ color: '#3E4949', display: 'block', marginBottom: '4px' }}>
                  Código da vaga
                </label>
                <InsetInput
                  id="code"
                  type="text"
                  {...register('code')}
                  hasError={!!errors.code}
                  aria-invalid={!!errors.code}
                  aria-describedby={errors.code ? "code-error" : undefined}
                  disabled={isSubmitting}
                />
                {errors.code && (
                  <span id="code-error" style={{ fontSize: '0.6875rem', color: '#BA1A1A', marginTop: '4px', display: 'block', fontWeight: 'bold' }}>{errors.code.message}</span>
                )}
              </div>
              <div>
                <label htmlFor="companyName" className="tb-label-sm" style={{ color: '#3E4949', display: 'block', marginBottom: '4px' }}>
                  Nome fantasia tóxico
                </label>
                <InsetInput
                  id="companyName"
                  type="text"
                  {...register('companyName')}
                  hasError={!!errors.companyName}
                  aria-invalid={!!errors.companyName}
                  aria-describedby={errors.companyName ? "companyName-error" : undefined}
                  disabled={isSubmitting}
                />
                {errors.companyName && (
                  <span id="companyName-error" style={{ fontSize: '0.6875rem', color: '#BA1A1A', marginTop: '4px', display: 'block', fontWeight: 'bold' }}>{errors.companyName.message}</span>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="title" className="tb-label-sm" style={{ color: '#3E4949', display: 'block', marginBottom: '4px' }}>
                Cargo humilhante
              </label>
              <InsetInput
                id="title"
                type="text"
                {...register('title')}
                hasError={!!errors.title}
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? "title-error" : undefined}
                disabled={isSubmitting}
              />
              {errors.title && (
                <span id="title-error" style={{ fontSize: '0.6875rem', color: '#BA1A1A', marginTop: '4px', display: 'block', fontWeight: 'bold' }}>{errors.title.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="salary" className="tb-label-sm" style={{ color: '#3E4949', display: 'block', marginBottom: '4px' }}>
                Salário ilusório
              </label>
              <InsetInput
                id="salary"
                type="text"
                {...register('salary')}
                hasError={!!errors.salary}
                aria-invalid={!!errors.salary}
                aria-describedby={errors.salary ? "salary-error" : undefined}
                disabled={isSubmitting}
              />
              {errors.salary && (
                <span id="salary-error" style={{ fontSize: '0.6875rem', color: '#BA1A1A', marginTop: '4px', display: 'block', fontWeight: 'bold' }}>{errors.salary.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="description" className="tb-label-sm" style={{ color: '#3E4949', display: 'block', marginBottom: '4px' }}>
                Descrição
              </label>
              <InsetTextarea
                id="description"
                {...register('description')}
                hasError={!!errors.description}
                aria-invalid={!!errors.description}
                aria-describedby={errors.description ? "description-error" : undefined}
                rows={4}
                disabled={isSubmitting}
                style={{ width: '100%', fontFamily: "'Courier New', monospace", fontSize: '0.75rem', padding: '6px' }}
              />
              {errors.description && (
                <span id="description-error" style={{ fontSize: '0.6875rem', color: '#BA1A1A', marginTop: '4px', display: 'block', fontWeight: 'bold' }}>{errors.description.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="requirements" className="tb-label-sm" style={{ color: '#3E4949', display: 'block', marginBottom: '4px' }}>
                Requisitos abusivos
              </label>
              <InsetTextarea
                id="requirements"
                {...register('requirements')}
                hasError={!!errors.requirements}
                aria-invalid={!!errors.requirements}
                aria-describedby={errors.requirements ? "requirements-error" : undefined}
                rows={3}
                disabled={isSubmitting}
                style={{ width: '100%', fontFamily: "'Courier New', monospace", fontSize: '0.75rem', padding: '6px' }}
              />
              {errors.requirements && (
                <span id="requirements-error" style={{ fontSize: '0.6875rem', color: '#BA1A1A', marginTop: '4px', display: 'block', fontWeight: 'bold' }}>{errors.requirements.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="tagsRaw" className="tb-label-sm" style={{ color: '#3E4949', display: 'block', marginBottom: '4px' }}>
                Tags (separadas por vírgula)
              </label>
              <InsetInput
                id="tagsRaw"
                type="text"
                {...register('tagsRaw')}
                disabled={isSubmitting}
              />
            </div>


            {msg && (
              <div
                style={{
                  padding: '8px',
                  background: msg.type === 'success' ? 'rgba(56,254,19,0.12)' : '#FFDAD6',
                  color: msg.type === 'error' ? '#BA1A1A' : 'inherit',
                  fontSize: '0.75rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {msg.text}
              </div>
            )}

            <BevelButton type="submit" variant="toxic" icon={isSubmitting ? "hourglass_empty" : "send"} disabled={isSubmitting} style={{ alignSelf: 'flex-start' }}>
              {isSubmitting ? 'Enviando...' : 'Enviar para moderação'}
            </BevelButton>
          </form>
        </Win95Window>

        <Win95Window title="Minhas_solicitações.log" icon="inventory_2" style={{ minHeight: '160px' }}>
          <div style={{ padding: '8px', overflow: 'auto', maxHeight: '220px' }}>
            {isLoading && <p className="tb-label-sm">Lendo fila...</p>}
            {!isLoading && minhas.length === 0 && (
              <p className="tb-label-sm" style={{ color: '#3E4949' }}>
                Nenhuma solicitação ainda.
              </p>
            )}
            {minhas.map((job: Job) => (
              <div
                key={job.id}
                style={{
                  padding: '8px',
                  marginBottom: '6px',
                  background: '#F4F3F3',
                  borderBottom: '1px solid #808080',
                  fontSize: '0.6875rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                <strong>{job.code}</strong> — {job.title}{' '}
                <span style={{ color: '#000080' }}>({jobStatusLabels[job.status] ?? job.status})</span>
              </div>
            ))}
          </div>
        </Win95Window>
      </div>
    </AppShell>
  );
}
