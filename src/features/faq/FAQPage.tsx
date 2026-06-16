import React from 'react';
import { AppShell } from '../../components/shell/AppShell';
import { Win95Window } from '../../components/shell/Win95Window';

export function FAQPage() {
  return (
    <AppShell>
      <div style={{ padding: '16px', maxWidth: '800px', margin: '0 auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Win95Window
          title="Manual_da_Exploracao_v1.0.exe"
          icon="menu_book"
          style={{ flex: 1 }}
          statusBarItems={[
            { label: 'Documento Classificado', grow: true },
            { label: 'Leitura Obrigatória' },
          ]}
        >
          <div style={{ padding: '24px', background: '#FFFFFF', overflowY: 'auto', flex: 1, boxShadow: 'inset 2px 2px 0px #808080, inset -2px -2px 0px #FFFFFF', fontFamily: "'Courier New', monospace" }}>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#BA1A1A', textTransform: 'uppercase', marginBottom: '8px' }}>
              FAQ Corporativo: O Guia Definitivo do Dark LinkedIn
            </h1>
            <p style={{ color: '#3E4949', fontStyle: 'italic', marginBottom: '32px' }}>
              Última atualização: Antes da revolução industrial (quando era bom).
            </p>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#106E00', borderBottom: '2px dashed #106E00', paddingBottom: '4px' }}>1. O que é o Esgotin?</h2>
              <p style={{ marginTop: '12px', lineHeight: 1.6 }}>
                Se o LinkedIn é a vitrine iluminada onde as pessoas fingem que amam acordar às 5h da manhã, o <strong>Esgotin</strong> é o esgoto por onde a água suja do mercado de trabalho escorre. Somos o <em>Dark LinkedIn</em>: a primeira plataforma feita de empregador parasita para trabalhador desesperado. Aqui não há "fit cultural", há apenas a mais pura, crua e descarada necessidade de sobrevivência.
              </p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#106E00', borderBottom: '2px dashed #106E00', paddingBottom: '4px' }}>2. Visão e Proposta de Valor</h2>
              <p style={{ marginTop: '12px', lineHeight: 1.6 }}>
                Nossa visão é maximizar o lucro extraindo a última gota de sanidade mental da base da pirâmide. Eliminamos a burocracia do RH tradicional e conectamos diretamente empresas dispostas a oferecer o mínimo absoluto com profissionais dispostos a aceitar o inaceitável. Tudo isso sob o manto protetor do anonimato corporativo.
              </p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#106E00', borderBottom: '2px dashed #106E00', paddingBottom: '4px' }}>3. Leis de Defesa do Ofertante (Código de Ética Reversa)</h2>
              <p style={{ marginTop: '12px', lineHeight: 1.6, marginBottom: '16px' }}>
                Segundo as diretrizes de governança do Esgotin, todo Empresário Legítimo (ou Ilegítimo) goza dos seguintes direitos inalienáveis, independentemente da lei trabalhista vigente no mundo da superfície:
              </p>
              
              <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li style={{ background: '#EEEEEE', padding: '12px', border: '1px solid #808080' }}>
                  <strong>Artigo 1 - Direito Incondicional de Oferta:</strong> O contratante possui o direito irrevogável de ofertar vagas insalubres, dentro da lei ou não, respeitando ou não os direitos humanos, cabendo exclusivamente ao miserável do trabalhador o ônus de aceitá-las ou morrer de fome.
                </li>
                <li style={{ background: '#EEEEEE', padding: '12px', border: '1px solid #808080' }}>
                  <strong>Artigo 2 - Presunção de Anonimato:</strong> O contratante tem o direito de permanecer nas sombras (`AnônimoXXX`) até que o contrato seja selado, para evitar processos e linchamentos virtuais. Apenas o contratado sacrificado saberá seu CNPJ.
                </li>
                <li style={{ background: '#EEEEEE', padding: '12px', border: '1px solid #808080' }}>
                  <strong>Artigo 3 - Rescisão Espontânea e Imediata:</strong> O contratante pode, a qualquer momento e sem justificativa plausível, clicar no botão de "Demitir" e lançar o contratado ao status de "Em Decomposição", promovendo-o de volta à fila do desemprego.
                </li>
              </ul>
            </section>

            <div style={{ background: 'rgba(186,26,26,0.1)', padding: '16px', border: '2px solid #BA1A1A', textAlign: 'center', marginTop: '48px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#BA1A1A', marginBottom: '8px' }}>warning</span>
              <p style={{ margin: 0, fontWeight: 'bold', color: '#BA1A1A' }}>
                O Esgotin não se responsabiliza por crises de burnout, processos trabalhistas ou perda de alma durante o uso da plataforma.
              </p>
            </div>
          </div>
        </Win95Window>
      </div>
    </AppShell>
  );
}
