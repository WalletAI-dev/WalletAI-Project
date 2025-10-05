# Backend WalletAI - Node.js + Express + Prisma

API REST para o sistema WalletAI, desenvolvida com Node.js, Express e Prisma ORM.

## Tecnologias

- **Node.js** com Express
- **Prisma ORM** para PostgreSQL
- **JWT** para autenticação
- **bcryptjs** para hash de senhas
- **Celebrate/Joi** para validação
- **Axios** para comunicação com AI Service

## Estrutura do Projeto

```
src/
├── controllers/        # Lógica de negócio
│   ├── UsersController.js
│   ├── SessionsController.js
│   └── TransactionsController.js
├── routes/            # Definição das rotas
│   ├── index.js
│   ├── users.routes.js
│   ├── sessions.routes.js
│   └── transactions.routes.js
├── middlewares/       # Middlewares customizados
│   └── auth.js
├── services/          # Serviços externos
│   └── aiCategorizer.js
├── lib/              # Configurações
│   └── prisma.js
├── errors/           # Tratamento de erros
│   └── AppError.js
├── app.js            # Configuração do Express
└── server.js         # Ponto de entrada
```

## Endpoints da API

### Autenticação

- `POST /users` - Cadastro de usuário
- `POST /sessions` - Login

### Transações (Protegidas)

- `POST /transactions` - Criar transação
- `GET /transactions` - Listar transações do usuário
- `DELETE /transactions/:id` - Deletar transação

## Scripts Disponíveis

```bash
npm run dev              # Executa em modo de desenvolvimento
npm run prisma:migrate   # Executa migrações do banco
npm run prisma:studio    # Abre Prisma Studio
npm run prisma:seed      # Popula categorias iniciais
```

## Configuração e Execução

1. **Instalar Dependências:**
   ```bash
   npm install
   ```

2. **Configurar Variáveis de Ambiente:**
   - Renomeie `.env.example` para `.env`
   - Configure `DATABASE_URL` com seu PostgreSQL
   - Defina `JWT_SECRET` seguro
   - Configure `AI_SERVICE_BASE_URL`

3. **Executar Migrações:**
   ```bash
   npm run prisma:migrate
   ```

4. **Popular Categorias:**
   ```bash
   npm run prisma:seed
   ```

5. **Iniciar Servidor:**
   ```bash
   npm run dev
   ```

## Categorias Padrão

- Alimentação
- Transporte
- Moradia
- Lazer
- Saúde
- Educação
- Outros

## Integração com AI Service

O backend se comunica com o serviço de IA Python para categorização automática de despesas através do endpoint `/categorize`.

## Responsabilidade

**Membro 1**: Desenvolvimento completo do backend com foco em autenticação e gestão de transações.