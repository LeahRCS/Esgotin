<div align="center">
  <h1>☣️ Esgotin 💰</h1>
  <p><em>Sistema Full-Stack de Simulação, Gestão e Exaustão Organizacional</em></p>

  <img src="https://img.shields.io/badge/Wasp-FCA311?style=for-the-badge&logo=wasp&logoColor=black" alt="Wasp" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</div>

<br />

## 📖 Sobre o Projeto

O **Esgotin** (um nome que dispensa maiores análises freudianas) é um laboratório acadêmico disfarçado de software corporativo. Nascido da necessidade de aprovação universitária, este sistema simula processos de organização e recrutamento com uma fidelidade dolorosa à vida real: maçante no conceito, mas com uma arquitetura técnica absolutamente impecável por baixo dos panos.

Afinal, se somos obrigados a modelar o tédio administrativo e a burocracia, que o façamos com tipagem estrita, consultas otimizadas e uma lógica de negócios inquebrável.

> **Crítica direta que parodia plataformas de vagas** — fluxo corporativo × operário × moderação. Inspirado de propósito na dinâmica de uma rede profissional, com tom satírico e papéis bem separados.

---

## ✨ Principais Funcionalidades

- 🔐 **Autenticação:** Barreiras criptográficas que esperamos serem robustas, pois nem todo mundo deveria ter privilégios para acessar esse categórico nível gerencial.
- 🗄️ **Modelagem Relacional (Prisma):** Tabelas e relações que amarram os dados com muito mais lógica, estabilidade e coesão do que qualquer processo seletivo do mercado atual (ou talvez não, mas vamos relevar).
- 📊 **CRUD Completo:** Crie expectativas corporativas, Leia relatórios densos, Atualize burocracias e Delete a sua paciência (ou apenas os registros do banco mesmo).
- ⚡ **Interface Reativa:** Porque, diferentemente das lentas engrenagens do mundo corporativo, o nosso front-end precisa responder instantaneamente aos comandos.

| Funcionalidade | O que faz na prática |
| --- | --- |
| **Papéis (operário, corporativo, admin)** | Modelo de utilizador + guards nas operações e na UI. |
| **Feed de "iscas" (vagas)** | Vagas `ACTIVE` visíveis ao operário; detalhe e candidatura. |
| **Lançar vaga** | Corporativo submete vagas em `PENDING_MODERATION`. |
| **Olimpo (moderação)** | Admin aprova (publica) ou rejeita antes de irem ao feed. |
| **Moedor** | Corporativo vê candidatos às próprias vagas. |
| **Auth integrada** | Wasp Auth + seed com contas de demonstração. |

---

## 🛠️ Arquitetura e Tecnologias

O ecossistema escolhido garante que, enquanto o usuário finge trabalhar, o servidor trabalha de verdade:

* **[Wasp](https://wasp-lang.dev/):** O *framework* que faz o trabalho sujo de conectar o front e o back-end, nos poupando do *boilerplate* infernal e permitindo focar no que importa.
* **[React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/):** A dupla dinâmica para garantir que a interface seja fluida e que o código não quebre tão facilmente quanto o psicológico de um gestor no fim do mês.
* **[Prisma ORM](https://www.prisma.io/):** Lidando com o banco de dados de forma civilizada e blindada contra falhas humanas.

| Camada | Tecnologia |
| --- | --- |
| **Frontend** | React 19, Vite 7, React Router 7 |
| **Dados no cliente** | TanStack Query v4 (compatível com o SDK Wasp) |
| **Backend** | Node (gerado pelo Wasp), operações tipadas |
| **ORM / BD** | Prisma 5 + **PostgreSQL** |

### 🤔 Porquê Wasp?

Para um protótipo com rotas, auth, servidor e cliente no mesmo repositório, o **Wasp** reduz boilerplate: declaras rotas e operações no `main.wasp`, manténs o Prisma no `schema.prisma` e focas a lógica em TypeScript no `src/`. Encaixa bem quando o objetivo é **validar fluxo de negócio** (fila de moderação, visibilidade por papel) sem montar à mão toda a infraestrutura típica.

---

## 🎭 Fluxo do Protótipo (a paródia em ação)

| Papel | O que faz |
| --- | --- |
| 🐀 **Operário** (`WORKER`) | Vê **Iscas** (vagas já aprovadas), abre o detalhe e candidata-se — com toda a esperança ingênua de um rato no esgoto. |
| 🏢 **Corporativo** (`CORPORATE`) | **Lançar vaga podre** (`/lancar-isca`) envia para a fila; gere candidatos no **Moedor** — porque triturar sonhos é o core business. |
| ⚡ **Admin** (`ADMIN`) | No **Olimpo** (`/olimpo`), aprova (publica no feed) ou rejeita propostas pendentes — com a misericórdia de um deus grego num mau dia. |

Vagas novas ficam em `PENDING_MODERATION` até o admin publicar (`ACTIVE`) ou encerrar (`CLOSED`).

---

## 🗺️ Mapeamento de Rotas

| Rota | Path | Quem acessa | Descrição |
| --- | --- | --- | --- |
| Login | `/login` | 🌐 Público | Portão de entrada do esgoto |
| Iscas (Feed) | `/` e `/iscas` | 🐀 Operário | Feed de vagas tóxicas aprovadas |
| Contrato Infâmia | `/contrato/:jobId` | 🐀 Operário | Detalhe da vaga + candidatura |
| Contratos | `/contratos` | 🐀 Operário | Minhas candidaturas (e arrependimentos) |
| Lançar Isca | `/lancar-isca` | 🏢 Corporativo | Submeter nova vaga podre |
| Moedor | `/moedor` | 🏢 Corporativo | Triturar — digo, avaliar candidatos |
| Olimpo | `/olimpo` | ⚡ Admin | Moderação divina das vagas |

---

## 🚀 Guia de Instalação (não tem piadinha)

Para instanciar este simulador de burocracia em seu próprio terminal e ver a mágica acontecer:

> **Arch Linux / CachyOS:** Se você usa CachyOS, pode rodar o script de instalação automatizado presente na raiz (`./install-esgotin-cachyos.sh`).
> **🐧 Windows?** Este guia é para **Linux**. Se você usa Windows, instale o [WSL2](https://learn.microsoft.com/pt-br/windows/wsl/install) e execute tudo dentro dele.

### Pré-requisitos

- **Node.js** 22+ (exigência do Wasp 0.22)
  ```bash
  node --version   # deve retornar v22.x.x ou superior
  ```
  *(WSL2: `sudo apt update && sudo apt install -y nodejs npm`, ou use o [nvm](https://github.com/nvm-sh/nvm) — `nvm install 22`)*

- **PostgreSQL** em execução
  ```bash
  # Verifica se está rodando:
  pg_isready       # deve retornar "aceitando conexões"
  ```
  *(WSL2: `sudo apt install -y postgresql` → `sudo service postgresql start` — o `systemctl` não funciona no WSL, use `service`)*

- Uma xícara de café forte e um leve desprezo por RHs, sendo a primeira optativa.

(OBS: eu menti, teve piadinha sim)

### Execução Local

**1.** Clone o repositório para o seu santuário (ambiente local):
```bash
git clone https://github.com/LeonardoRCS/Esgotin.git
cd Esgotin
```

**2.** Crie o banco de dados `esgotin` no PostgreSQL (se ainda não existir):
```bash
sudo -u postgres createdb esgotin
```
*(WSL2: `sudo -u postgres psql -c "CREATE DATABASE esgotin;"` — ou se seu usuário Postgres tiver permissão, apenas `createdb esgotin`)*

**3.** Configure as variáveis de ambiente (a parte chata, mas necessária):
```bash
cp .env.example .env.server
```
Edite o `.env.server` e ajuste `DATABASE_URL` com suas credenciais:
```
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/esgotin"
```
*(WSL2: as credenciais padrão costumam ser `postgres:postgres` — se der erro de autenticação, rode `sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"` e use a senha `postgres`)*

**4.** Instale dependências + Wasp CLI (localmente, sem precisar de `sudo`):
```bash
npm install
```
Isso instala tudo, incluindo o Wasp CLI em `node_modules/.bin/wasp`. A partir daqui, use **`npx wasp`** em vez de `wasp` diretamente.

> 💡 *Se preferir instalar o Wasp globalmente:* `sudo npm i -g @wasp.sh/wasp-cli@latest` — aí pode usar `wasp` direto, sem `npx`.

**5.** Compile o projeto (o Wasp gera o SDK, configura o Prisma e prepara tudo):
```bash
npx wasp compile
```

**6.** Rode as migrações e o seed (populando o esgoto com dados de demo):
```bash
npx wasp db migrate-dev
npx wasp db seed seedEsgotin
```
Se tudo correr bem, vai ver: *"🐀 Esgoto populado com sucesso. O sistema está decompondo normalmente."*

**7.** Inicie o servidor (e reze para funcionar de primeira):
```bash
npx wasp start
```
O cliente e o servidor sobem juntos:
- 🌐 **Frontend:** http://localhost:3000
- ⚙️ **Backend:** http://localhost:3001

*(WSL2: acesse `http://localhost:3000` normalmente no navegador do Windows — o WSL2 faz o port forwarding automático)*

EM CASO DE ALGO NÃO FUNCIONAR, NÃO NOS PROCURE!
(seja esperto, busque por ajuda na internet)

### 🧪 Testes

```bash
npm test
```

---

## 🐀 Contas de Demonstração (após o seed)

Para testar sem precisar criar conta (porque burocracia já basta no código):

| Papel | Utilizador | Senha | O que faz |
| --- | --- | --- | --- |
| 🐀 Operário | `rato_operario` | `esgoto123` | Entra em **Iscas** e pode se candidatar |
| 🏢 Corporativo | `rato_corporativo` | `explorar123` | **Lançar vaga** + **Moedor** |
| ⚡ Moderador | `esgoto_root` | `modera123` | **Olimpo** (fila inclui `#MOD-001` de demo) |

---

## 📁 Estrutura do Repositório

```
Esgotin/
├── main.wasp              # Rotas, páginas, queries, actions e seeds
├── schema.prisma          # Modelos Prisma (User, Job, Application)
├── vite.config.ts         # Plugin obrigatório wasp()
├── .github/workflows/     # CI/CD
└── src/
    ├── App.tsx             # Root component
    ├── dbSeed.ts           # Seed de dados de demonstração
    ├── features/
    │   ├── auth/           # 🔐 Login
    │   ├── iscas/          # 🐀 Feed de vagas (operário)
    │   ├── contratos/      # 📋 Candidaturas do operário
    │   ├── contrato-infamia/ # 📄 Detalhe + candidatura
    │   ├── lancar-isca/    # 🏢 Criação de vagas (corporativo)
    │   ├── moedor/         # 🔧 Gestão de candidatos (corporativo)
    │   └── olimpo/         # ⚡ Moderação (admin)
    ├── components/         # Componentes reutilizáveis (auth, shell, ui)
    ├── theme/              # 🎨 Design system (tokens + CSS tóxico)
    ├── types/              # Tipagens compartilhadas
    └── utils/              # Utilitários
```

---

## 🗓️ Roadmap (apenas se a sanidade prevalecer)

- [x] Refinar UX do feed e do formulário de vagas (Refatorado com Zod + React Hook Form e Empty States).
- [ ] Mais regras de visibilidade e estados de candidatura.
- [ ] Testes e2e ou fluxos adicionais de moderação.
- [x] Polimento de acessibilidade e segurança (Auditoria de IDOR, Exposição de Dados e XSS concluída).
- [x] Mapeamento de Rotas (Veja `routes.md`).

---

## 🔒 Segurança e `npm audit`

O `npm audit` pode ainda apontar vulnerabilidades em dependências transitivas do toolchain (por exemplo pacotes ligados ao SDK do Wasp). Corrigir isso costuma depender de atualização do próprio Wasp ou de `overrides` com cuidado; não é um problema específico do código deste repositório — é mais um problema existencial do ecossistema Node.js.

---

## 📜 Licença

MIT — porque até o sofrimento corporativo merece ser open source.

---

<div align="center">
  <br />
  <em>Feito com propósito satírico (e um pouco de desespero acadêmico) por <a href="https://github.com/LeonardoRCS">Leah R.C.S.</a> em parceria com <a href="https://github.com/Monterd">Kauê Portella</a></em>
  <br /><br />
  <sub>Nenhum rato foi ferido durante o desenvolvimento deste projeto. Quanto aos Devs... Já não podemos dizer o mesmo.</sub>
</div>
