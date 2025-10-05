.PHONY: help start stop restart logs clean build shell-backend shell-frontend shell-ai migrate

help: ## Mostrar esta ajuda
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

start: ## Iniciar todos os serviços
	@echo "🚀 Iniciando WalletAI Project..."
	docker-compose up --build -d
	@echo "⏳ Aguardando serviços iniciarem..."
	@sleep 10
	@echo "🗄️ Executando migrações..."
	docker-compose exec -T backend npx prisma migrate deploy
	@echo "✅ Projeto iniciado!"
	@echo "Frontend: http://localhost:5173"
	@echo "Backend: http://localhost:3333"
	@echo "AI Service: http://localhost:8000"

stop: ## Parar todos os serviços
	@echo "🛑 Parando serviços..."
	docker-compose down

restart: ## Reiniciar todos os serviços
	@echo "🔄 Reiniciando serviços..."
	docker-compose restart

logs: ## Ver logs de todos os serviços
	docker-compose logs -f

clean: ## Limpar containers e volumes
	@echo "🧹 Limpando containers e volumes..."
	docker-compose down -v
	docker system prune -f

build: ## Rebuildar containers
	@echo "🏗️ Reconstruindo containers..."
	docker-compose build --no-cache

shell-backend: ## Abrir shell no container do backend
	docker-compose exec backend sh

shell-frontend: ## Abrir shell no container do frontend
	docker-compose exec frontend sh

shell-ai: ## Abrir shell no container do AI service
	docker-compose exec ai_service sh

migrate: ## Executar migrações do banco
	docker-compose exec backend npx prisma migrate deploy

seed: ## Popular banco com dados iniciais
	docker-compose exec backend npx prisma db seed