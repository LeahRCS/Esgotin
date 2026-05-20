# Rotas do Projeto Esgotin

Este documento mapeia todas as rotas da aplicação, seus respectivos componentes e os níveis de acesso (roles) requeridos para utilizá-las.

| Rota | Componente | Autenticação | Permissão Necessária (Role) | Descrição |
| --- | --- | --- | --- | --- |
| `/login` | `LoginPage` | Não | Nenhuma | Tela inicial de autenticação do sistema Win95. |
| `/` | `IscasPage` | Sim | `WORKER` (preferencialmente) | Redirecionamento padrão para o feed de vagas ativas (Iscas). |
| `/iscas` | `IscasPage` | Sim | `WORKER` | Listagem pública de todas as vagas aprovadas e disponíveis para candidatura. |
| `/contrato/:jobId` | `ContratoInfamiaPage` | Sim | `WORKER` / `CORPORATE` / `ADMIN` | Tela de detalhes de uma vaga específica e formulário de candidatura. |
| `/contratos` | `ContratosPage` | Sim | `WORKER` | Registro (log) das candidaturas realizadas pelo rato operário. |
| `/lancar-isca` | `LancarIscaPage` | Sim | `CORPORATE` | Formulário para o perfil corporativo propor uma nova vaga abusiva. |
| `/moedor` | `MoedorPage` | Sim | `CORPORATE` | Painel para o perfil corporativo gerenciar candidaturas e moer currículos. |
| `/olimpo` | `OlimpoPage` | Sim | `ADMIN` | Painel exclusivo do Ministério da Lama para aprovar/rejeitar novas vagas. |

> [!NOTE]
> As permissões são validadas tanto a nível de página (pelo componente `<RequireRole>`) quanto nas operações do backend (via `context.user.role`).
