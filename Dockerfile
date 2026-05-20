# ==========================================
# STAGE 1: Builder (Compilação Wasp)
# ==========================================
FROM node:22-alpine AS builder

# Instalar dependências necessárias para compilar dependências nativas (Prisma, etc) e o CLI do Wasp
RUN apk add --no-cache curl python3 build-base libtool autoconf automake openssl

# Instalar Wasp CLI
RUN curl -sSL https://get.wasp-lang.dev/installer.sh | sh
ENV PATH="/root/.local/bin:${PATH}"

WORKDIR /app

# Copiar arquivos do projeto para aproveitar cache de camadas
COPY package*.json ./
COPY . .

# Argumento para URL da API (usado na build do frontend pelo Wasp)
ARG REACT_APP_API_URL=http://localhost:3001
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Executar a compilação do Wasp (Gera o backend em .wasp/build/server e frontend em .wasp/build/web-app)
RUN wasp build

# ==========================================
# STAGE 2: Backend Production (Node.js)
# ==========================================
FROM node:22-alpine AS backend

# Prisma necessita do openssl para rodar
RUN apk add --no-cache openssl

ENV NODE_ENV=production
WORKDIR /app

# Copiar APENAS o necessário do estágio de build
COPY --from=builder /app/.wasp/build/node_modules ./node_modules
COPY --from=builder /app/.wasp/build/server/node_modules .wasp/out/server/node_modules
COPY --from=builder /app/.wasp/build/server/bundle .wasp/out/server/bundle
COPY --from=builder /app/.wasp/build/server/package*.json .wasp/out/server/
COPY --from=builder /app/.wasp/build/db/ .wasp/out/db/

# Segurança: Rodar como usuário não-root (alpine já tem o grupo/user 'node' criado)
RUN chown -R node:node /app
USER node

EXPOSE 3001
WORKDIR /app/.wasp/out/server
CMD ["npm", "run", "start-production"]

# ==========================================
# STAGE 3: Frontend Production (Nginx)
# ==========================================
FROM nginx:alpine AS frontend

# Remover arquivos padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Custom nginx config to handle React Router and reverse proxy for backend
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar a build estática (React/Vite) gerada pelo Wasp
COPY --from=builder /app/.wasp/build/web-app/build /usr/share/nginx/html

# Segurança: Garantir que o Nginx tenha permissões sem rodar o container como root extremo
RUN chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d
USER nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
