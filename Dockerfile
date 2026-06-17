# ==========================================
# STAGE 1: Builder (Compilação Wasp e Vite)
# ==========================================
FROM node:22-alpine AS builder

# Instalar dependências necessárias para compilar dependências nativas (Prisma, etc) e o CLI do Wasp
RUN apk add --no-cache curl python3 build-base libtool autoconf automake openssl

# Instalar Wasp CLI
RUN npm install -g @wasp.sh/wasp-cli

WORKDIR /app

# Copiar arquivos do projeto para aproveitar cache de camadas
COPY package*.json ./
COPY . .

# Wasp needs these installed
RUN npm install

# Argumento para URL da API (usado na build do frontend pelo Wasp)
ARG REACT_APP_API_URL=http://localhost:3001
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Executar a compilação do Wasp (Gera o código fonte em .wasp/out)
RUN wasp build

# Compilar o servidor Wasp (Prisma + Bundle do Backend)
RUN cd .wasp/out/server && npm install && npx prisma generate --schema='../db/schema.prisma' && npm run bundle

# Executar a compilação do Frontend via Vite (Gera a pasta estática build)
RUN npx vite build

# ==========================================
# STAGE 2: Backend Production (Node.js)
# ==========================================
FROM node:22-alpine AS backend

# Prisma necessita do openssl para rodar
RUN apk add --no-cache openssl

ENV NODE_ENV=production
WORKDIR /app

# Copiar APENAS o necessário do estágio de build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.wasp/out/server/node_modules .wasp/out/server/node_modules
COPY --from=builder /app/.wasp/out/server/bundle .wasp/out/server/bundle
COPY --from=builder /app/.wasp/out/server/package*.json .wasp/out/server/
COPY --from=builder /app/.wasp/out/db/ .wasp/out/db/

# Segurança: Rodar como usuário não-root (alpine já tem o grupo/user 'node' criado)
RUN chown -R node:node /app
USER node

EXPOSE 3001
WORKDIR /app/.wasp/out/server
CMD ["sh", "-c", "npm run db-migrate-prod && (npm run db-seed || echo '[SEED] Seed já foi aplicado ou falhou (não-fatal, ignorando).') && NODE_ENV=production npm run start"]

# ==========================================
# STAGE 3: Frontend Production (Nginx)
# ==========================================
FROM nginx:alpine AS frontend

# Remover arquivos padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Custom nginx config to handle React Router and reverse proxy for backend
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar a build estática (React/Vite) gerada pelo Wasp
COPY --from=builder /app/.wasp/out/web-app/build /usr/share/nginx/html

# Segurança: Garantir que o Nginx tenha permissões sem rodar o container como root extremo
RUN chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d
USER nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
