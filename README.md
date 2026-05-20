<div align="center">
  <h1>☣️ Esgotin 💰</h1>
  <p><em>Sistema Full-Stack de Simulação, Gestão e Exaustão Organizacional</em></p>

  <img src="https://img.shields.io/badge/Wasp-FCA311?style=for-the-badge&logo=wasp&logoColor=black" alt="Wasp" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</div>

<br />

## 📖 Sobre o Projeto

O **Esgotin** (um nome que dispensa maiores análises freudianas) é um laboratório acadêmico disfarçado de software corporativo. Nascido da necessidade de aprovação universitária, este sistema simula processos de organização e recrutamento com uma fidelidade dolorosa à vida real: maçante no conceito, mas com uma arquitetura técnica absolutamente impecável por baixo dos panos.

Afinal, se somos obrigados a modelar o tédio administrativo e a burocracia, que o façamos com tipagem estrita, consultas otimizadas, orquestração de contêineres e uma lógica de negócios inquebrável.

> **Crítica direta que parodia plataformas de vagas** — fluxo corporativo × operário × moderação. Inspirado de propósito na dinâmica de uma rede profissional tóxica, com tom satírico, estética brutalista e papéis muito bem separados.

---

## ✨ Principais Funcionalidades

- 🔐 **Autenticação:** Barreiras criptográficas robustas, pois nem todo mundo deveria ter privilégios para acessar esse categórico nível gerencial.
- 🗄️ **Modelagem Relacional (Prisma):** Tabelas e relações que amarram os dados com muito mais lógica, estabilidade e coesão do que qualquer processo seletivo do mercado atual (ou talvez não, mas vamos relevar).
- 📊 **CRUD Completo:** Crie expectativas corporativas, Leia relatórios densos, Atualize burocracias e Delete a sua paciência (ou apenas os registros do banco mesmo).
- ⚡ **Interface Reativa:** Porque, diferentemente das lentas engrenagens do mundo corporativo, o nosso front-end precisa responder instantaneamente aos comandos.
- 🐳 **Pronto para Escalar:** Infraestrutura Dockerizada multi-stage com balanceamento via Nginx e persistência nativa de logs.

| Funcionalidade | O que faz na prática |
| --- | --- |
| **Papéis (operário, corporativo, admin)** | Modelo de utilizador + guards de segurança nas operações e na UI. |
| **Feed de "Iscas" (vagas)** | Vagas `ACTIVE` visíveis ao operário; página de detalhes e candidatura. |
| **Lançar Vaga** | O corporativo submete vagas podres que caem em `PENDING_MODERATION`. |
| **Olimpo (moderação)** | O admin supremo aprova (publica) ou rejeita antes de irem ao feed. |
| **Moedor** | O corporativo analisa e descarta candidatos às próprias vagas. |
| **Auth Integrada** | Wasp Auth + script de seed populando o esgoto com contas de demonstração. |

---

## 🛠️ Arquitetura e Tecnologias

O ecossistema escolhido garante que, enquanto o usuário finge trabalhar, o servidor trabalha de verdade:

* **[Wasp](https://wasp-lang.dev/):** O *framework* que faz o trabalho sujo de conectar o front e o back-end, poupando o *boilerplate* infernal e permitindo focar no que importa.
* **[React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/):** A dupla dinâmica para garantir que a interface seja fluida e que o código não quebre tão facilmente quanto o psicológico de um gestor no fim do mês.
* **[Prisma ORM](https://www.prisma.io/):** Lidando com o banco de dados de forma civilizada e blindada contra falhas humanas.
* **[Docker](https://www.docker.com/) + [Nginx](https://www.nginx.com/):** Proxy reverso universal e isolamento de ambientes para deploy à prova de balas.

| Camada | Tecnologia |
| --- | --- |
| **Frontend** | React 19, Vite 7, React Router 7 |
| **Dados no cliente** | TanStack Query v4 (compatível com o SDK Wasp) |
| **Backend** | Node (gerado pelo Wasp), operações 100% tipadas |
| **ORM / BD** | Prisma 5 + **PostgreSQL** |
| **Infra/DevOps** | Docker Compose Multi-stage + Nginx + Dozzle Logs |

---

## 🎭 Fluxo do Protótipo (A Paródia em Ação)

| Papel | O que faz |
| --- | --- |
| 🐀 **Operário** (`WORKER`) | Vê as **Iscas** (vagas já aprovadas), abre o detalhe e candidata-se — com toda a esperança ingênua de um rato no esgoto. |
| 🏢 **Corporativo** (`CORPORATE`) | Usa a rota **Lançar Isca** para jogar propostas na fila; gere candidatos no **Moedor** — porque triturar sonhos é o *core business*. |
| ⚡ **Admin** (`ADMIN`) | Lá no **Olimpo**, aprova (publica no feed) ou rejeita as propostas pendentes — com a misericórdia de um deus grego num mau dia. |

---

## 🚀 Guia de Instalação (Sem Piadinhas)

Existem duas formas de rodar o Esgotin: **Via Docker (Recomendado/Produção)** ou **Via Wasp Local (Desenvolvimento)**.

### 🐳 Opção 1: Via Docker (O Jeito Sênior)
Requisito: Apenas ter o `docker` instalado. Essa é a melhor opção para testar a aplicação em um ambiente real.

```bash
# 1. Clone o repositório
git clone https://github.com/LeonardoRCS/Esgotin.git
cd Esgotin

# 2. Defina sua variável da API (mesmo que seja localhost) e suba a stack
export REACT_APP_API_URL="http://localhost:3001"
docker compose -f docker-compose.prod.yml up --build -d
```
Acesse o app em `http://localhost`. O Nginx vai rotear automaticamente a interface, e os logs ficam visíveis no incrível painel do Dozzle em `http://localhost:8080`.

### 💻 Opção 2: Via Wasp Local (Desenvolvimento Tradicional)
> **Dica Arch Linux / CachyOS:** Se você usa CachyOS, apenas execute `./install-esgotin-cachyos.sh` e seja feliz.

**Pré-requisitos:** Node.js 22+ e PostgreSQL em execução na sua máquina.

**1.** Crie o banco de dados e copie o `.env`:
```bash
sudo -u postgres createdb esgotin
cp .env.example .env.server
```
**2.** Instale o Wasp e as dependências:
```bash
npm install
npx wasp compile
```
**3.** Rode as migrações e popule o esgoto com os dados de demonstração:
```bash
npx wasp db migrate-dev
npx wasp db seed seedEsgotin
```
**4.** Inicie o servidor (e reze para funcionar de primeira):
```bash
npx wasp start
```
- 🌐 **Frontend:** `http://localhost:3000`
- ⚙️ **Backend:** `http://localhost:3001`

---

## 🐀 Contas de Demonstração (Após o Seed)

Para testar a toxidade corporativa de imediato:

| Papel | Utilizador | Senha | O que faz |
| --- | --- | --- | --- |
| 🐀 Operário | `rato_operario` | `esgoto123` | Entra em **Iscas** e pode se candidatar às armadilhas |
| 🏢 Corporativo | `rato_corporativo` | `explorar123` | Cria vagas no **Lançar Isca** e esmaga no **Moedor** |
| ⚡ Admin / Moderador | `esgoto_root` | `modera123` | Julga as almas no **Olimpo** |

---

## 📁 Estrutura do Repositório

```
Esgotin/
├── main.wasp              # O cérebro: Rotas, páginas, queries, actions e seeds
├── schema.prisma          # Modelos de banco de dados
├── Dockerfile             # Multi-stage build blindada e não-root
├── docker-compose.*.yml   # Orquestração do submundo corporativo
├── nginx.conf             # Proxy Reverso universal
├── src/
    ├── features/          # Funcionalidades (Olimpo, Moedor, Lançar-Isca...)
    ├── components/        # Componentes UI (Bevel Buttons, Windows 95 Shell)
    ├── theme/             # Design System (Tokens e CSS brutalista tóxico)
    └── utils/             # Utilitários e formatadores
```

---

## 🔒 Segurança e `npm audit`

A aplicação em si possui proteções contra IDOR e injeções, devidamente revisadas. O `npm audit` pode ocasionalmente apontar vulnerabilidades em dependências transitivas do toolchain (SDK do Wasp). Corrigir isso costuma depender de atualizações upstream; trate isso como um problema estrutural do ecossistema Node.js (ou, filosoficamente, do mercado de trabalho).

---

## 📜 Licença

MIT — Porque até o sofrimento corporativo merece ser open-source.

---

<div align="center">
  <br />
  <em>Feito com propósito satírico (e um pouco de desespero acadêmico) por <a href="https://github.com/LeonardoRCS">Leah R.C.S.</a> em parceria com <a href="https://github.com/Monterd">Kauê Portella</a></em>
  <br /><br />
  <sub>Nenhum rato foi ferido durante o desenvolvimento deste projeto. Quanto aos Devs... Já não podemos dizer o mesmo.</sub>
</div>
