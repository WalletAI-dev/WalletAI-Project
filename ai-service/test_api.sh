#!/bin/bash
# Script para testar o AI Service

echo "🚀 Testando AI Service..."

# Teste de health check
echo "📊 Testando endpoint de saúde..."
curl -X GET "http://localhost:5000/" \
     -H "accept: application/json"

echo ""
echo ""

# Teste de categorização
echo "🤖 Testando categorização de transação..."
curl -X POST "http://localhost:5000/categorize" \
     -H "accept: application/json" \
     -H "Content-Type: application/json" \
     -d '{
       "description": "Almoço no restaurante"
     }'

echo ""
echo ""

# Mais testes
echo "🧪 Testando outras categorias..."

echo "Transporte:"
curl -X POST "http://localhost:5000/categorize" \
     -H "accept: application/json" \
     -H "Content-Type: application/json" \
     -d '{
       "description": "Uber para o trabalho"
     }'

echo ""
echo "Saúde:"
curl -X POST "http://localhost:5000/categorize" \
     -H "accept: application/json" \
     -H "Content-Type: application/json" \
     -d '{
       "description": "Consulta médica"
     }'

echo ""
echo "✅ Testes concluídos!"