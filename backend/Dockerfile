# Estágio 1: Dependências
FROM node:18-alpine AS deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Estágio 2: Builder
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN npx prisma generate

# Estágio 3: Produção
FROM node:18-alpine AS runner
WORKDIR /usr/src/app

# Install bash, netcat and openssl for Prisma and wait-for-it.sh
RUN apk add --no-cache bash netcat-openbsd openssl

# Copy built application
COPY --from=builder /usr/src/app .

# Copy wait-for-it.sh script
COPY wait-for-it.sh ./wait-for-it.sh
RUN chmod +x ./wait-for-it.sh

# Copy and make start script executable
COPY start.sh ./start.sh
RUN chmod +x ./start.sh

EXPOSE 3333
CMD ["./start.sh"]