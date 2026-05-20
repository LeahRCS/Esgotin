#!/bin/bash
# Instalação do Esgotin no CachyOS
# Requisitos: Node.js 22+, PostgreSQL, npm

set -e

echo "☣️  Instalando Esgotin no CachyOS..."
echo ""

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# ============================================
# 1. Atualizar sistema
# ============================================
echo -e "${YELLOW}📦 Atualizando pacotes do sistema...${NC}"
sudo pacman -Syu --noconfirm

# ============================================
# 2. Instalar Node.js 22+ e npm
# ============================================
echo -e "${YELLOW}⬢ Instalando Node.js 22+...${NC}"

# Verificar se Node.js já está instalado e a versão
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -ge 22 ]; then
        echo -e "${GREEN}✓ Node.js $(node --version) já instalado${NC}"
    else
        echo -e "${YELLOW}⚠ Node.js versão antiga detectada. Atualizando...${NC}"
        sudo pacman -S nodejs npm --noconfirm
    fi
else
    sudo pacman -S nodejs npm --noconfirm
fi

echo -e "${GREEN}✓ Node.js: $(node --version)${NC}"
echo -e "${GREEN}✓ npm: $(npm --version)${NC}"

# ============================================
# 3. Instalar PostgreSQL
# ============================================
echo -e "${YELLOW}🐘 Instalando PostgreSQL...${NC}"

if ! command -v psql &> /dev/null; then
    sudo pacman -S postgresql --noconfirm
    
    # Inicializar cluster de dados
    sudo mkdir -p /var/lib/postgres/data
    sudo chown -R postgres:postgres /var/lib/postgres
    sudo -u postgres initdb -D /var/lib/postgres/data
else
    echo -e "${GREEN}✓ PostgreSQL já instalado${NC}"
fi

# Iniciar e habilitar serviço PostgreSQL
sudo systemctl enable postgresql
sudo systemctl start postgresql

# Aguardar PostgreSQL iniciar
sleep 2
until pg_isready; do
    echo "Aguardando PostgreSQL iniciar..."
    sleep 1
done

echo -e "${GREEN}✓ PostgreSQL rodando${NC}"

# ============================================
# 4. Criar banco de dados 'esgotin'
# ============================================
echo -e "${YELLOW}🗄️  Criando banco de dados 'esgotin'...${NC}"

# Criar banco se não existir
sudo -u postgres psql -c "SELECT 1 FROM pg_database WHERE datname = 'esgotin'" | grep -q 1 || \
    sudo -u postgres createdb esgotin

echo -e "${GREEN}✓ Banco 'esgotin' criado/verificado${NC}"

# ============================================
# 5. Configurar senha do usuário postgres
# ============================================
echo -e "${YELLOW}🔐 Configurando usuário PostgreSQL...${NC}"

# Definir senha 'postgres' para o usuário postgres (padrão do README)
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';" 2>/dev/null || true

echo -e "${GREEN}✓ Usuário 'postgres' configurado (senha: postgres)${NC}"

# ============================================
# 6. Verificar diretório do projeto
# ============================================
if [ ! -f "package.json" ] || [ ! -f "main.wasp" ]; then
    echo -e "${RED}❌ Erro: Execute este script dentro do diretório do projeto Esgotin!${NC}"
    echo "   Certifique-se de ter clonado o repositório e estar na pasta correta."
    exit 1
fi

# ============================================
# 7. Configurar variáveis de ambiente
# ============================================
echo -e "${YELLOW}⚙️  Configurando variáveis de ambiente...${NC}"

if [ ! -f ".env.server" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env.server
        # Ajustar DATABASE_URL com credenciais padrão
        sed -i 's|DATABASE_URL=.*|DATABASE_URL="postgresql://postgres:postgres@localhost:5432/esgotin"|' .env.server
        echo -e "${GREEN}✓ Arquivo .env.server criado${NC}"
    else
        echo 'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/esgotin"' > .env.server
        echo -e "${GREEN}✓ Arquivo .env.server criado do zero${NC}"
    fi
else
    echo -e "${YELLOW}⚠ .env.server já existe, mantendo configuração atual${NC}"
fi

# ============================================
# 8. Instalar dependências npm
# ============================================
echo -e "${YELLOW}📥 Instalando dependências do projeto...${NC}"
npm install

echo -e "${GREEN}✓ Dependências instaladas${NC}"

# ============================================
# 9. Compilar projeto com Wasp
# ============================================
echo -e "${YELLOW}🔨 Compilando projeto com Wasp...${NC}"
npx wasp compile

echo -e "${GREEN}✓ Projeto compilado${NC}"

# ============================================
# 10. Executar migrações
# ============================================
echo -e "${YELLOW}🔄 Executando migrações do banco...${NC}"
npx wasp db migrate-dev

echo -e "${GREEN}✓ Migrações aplicadas${NC}"

# ============================================
# 11. Popular banco com dados de demo
# ============================================
echo -e "${YELLOW}🌱 Populando banco com dados de demonstração...${NC}"
npx wasp db seed seedEsgotin

echo -e "${GREEN}✓ Dados de demo inseridos${NC}"

# ============================================
# Fim!
# ============================================
echo ""
echo -e "${GREEN}☣️  Esgotin instalado com sucesso!${NC}"
echo ""
echo "Para iniciar o servidor, execute:"
echo -e "  ${YELLOW}npx wasp start${NC}"
echo ""
echo "Acesso:"
echo "  🌐 Frontend: http://localhost:3000"
echo "  ⚙️  Backend:  http://localhost:3001"
echo ""
echo "Contas de demonstração:"
echo "  🐀 Operário:     rato_operario / esgoto123"
echo "  🏢 Corporativo:  rato_corporativo / explorar123"
echo "  ⚡ Admin:        esgoto_root / modera123"
echo ""
