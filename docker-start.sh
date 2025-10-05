#!/bin/bash

echo "🚀 Iniciando WalletAI Project..."
echo ""

# Parar containers se estiverem rodando
echo "🛑 Parando containers existentes..."
docker-compose down

echo ""
echo "🏗️  Construindo e iniciando containers..."
docker-compose up --build -d

echo ""
echo "⏳ Aguardando serviços iniciarem..."
sleep 10

echo ""
echo "🗄️  Executando migrações do banco de dados..."
docker-compose exec -T backend npx prisma migrate deploy

echo ""
echo "✅ Projeto iniciado com sucesso!"
echo ""
echo "📋 Serviços disponíveis:"
echo "   Frontend:  http://localhost:5173"
echo "   Backend:   http://localhost:3333"
echo "   AI Service: http://localhost:8000"
echo ""
echo "📊 Para ver os logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 Para parar os serviços:"
echo "   docker-compose down"