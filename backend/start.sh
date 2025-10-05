#!/bin/bash

echo "Aguardando o banco de dados estar pronto..."
./wait-for-it.sh postgres_db:5432 --timeout=60 --strict

echo "Executando migrações do banco de dados..."
npx prisma migrate deploy

echo "Iniciando o servidor..."
npm run start