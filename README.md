# WalletAI-Project

Sistema de carteira inteligente com categorização automática de transações usando IA.

## Estrutura do Projeto

- **backend/**: API Node.js com Express e Prisma ORM
- **frontend/**: Interface React com TypeScript e Vite
- **ai-service/**: Serviço de IA em Python com FastAPI
- **docker-compose.yml**: Orquestração dos serviços

## Tecnologias Utilizadas

### Backend
- Node.js 18
- Express 4.21.2
- Prisma ORM 5.22.0
- PostgreSQL
- JWT para autenticação
- bcryptjs para criptografia

### Frontend
- React 18.3.1
- TypeScript 5.9.3
- Vite 5.4.20
- Styled Components 6.1.19
- Chart.js 4.5.0
- React Router 6.30.1

### AI Service
- Python 3.9
- FastAPI
- Scikit-learn
- NLTK
- Pandas

### Infraestrutura
- Docker & Docker Compose
- NGINX
- PostgreSQL

## Como Executar

### Pré-requisitos
- Docker
- Docker Compose
- Make (opcional, para comandos simplificados)

### Execução Rápida

#### Opção 1: Com Makefile (Recomendado)
```bash
# Clonar e entrar no diretório
git clone <url-do-repositorio>
cd WalletAI-Project

# Iniciar projeto completo
make start

# Ver comandos disponíveis
make help
```

#### Opção 2: Com Docker Compose
```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd WalletAI-Project

# Executar script de inicialização
./docker-start.sh

# OU manualmente:
docker-compose up --build -d
docker-compose exec backend npx prisma migrate deploy
```

### Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `make start` | Iniciar todos os serviços |
| `make stop` | Parar todos os serviços |
| `make restart` | Reiniciar serviços |
| `make logs` | Ver logs em tempo real |
| `make clean` | Limpar containers e volumes |
| `make migrate` | Executar migrações |
| `make shell-backend` | Abrir shell no backend |

### Acessar os Serviços

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3333
- **AI Service**: http://localhost:8000
- **PostgreSQL**: localhost:5432

### Endpoints da API

#### Autenticação
- `POST /sessions` - Login
- `POST /users` - Cadastro

#### Transações
- `GET /transactions` - Listar transações
- `POST /transactions` - Criar transação
- `PUT /transactions/:id` - Atualizar transação
- `DELETE /transactions/:id` - Deletar transação

#### AI Service
- `POST /categorize` - Categorizar transação

## Desenvolvimento Local

### Backend
```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### AI Service
```bash
cd ai-service
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

## Estrutura de Pastas

```
WalletAI-Project/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   ├── prisma/
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   ├── package.json
│   ├── Dockerfile
│   └── nginx.conf
├── ai-service/
│   ├── main.py
│   ├── categorizer.py
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
├── .env
└── README.md
```

## Contribuição

1. Faça fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.