# Estágio 1: Build da aplicação React
FROM node:18-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependência e instala
COPY package*.json ./
RUN npm install

# Copia o código fonte
COPY . .

# Argumento para a URL da API, que será passado pelo docker-compose
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Roda o build da aplicação
RUN npm run build


# Estágio 2: Servir os arquivos estáticos com NGINX
FROM nginx:1.25-alpine

# Remove a configuração padrão do NGINX
RUN rm /etc/nginx/conf.d/default.conf

# Copia nossa configuração personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos gerados no estágio de build
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 80 (padrão do NGINX)
EXPOSE 80

# Comando para iniciar o NGINX
CMD ["nginx", "-g", "daemon off;"]