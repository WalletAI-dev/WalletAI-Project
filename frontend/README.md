# Frontend WalletAI - React + TypeScript + Vite

Interface do usuário para o sistema WalletAI, desenvolvida com React, TypeScript e Vite.

## Tecnologias

- **React** 18.2.0 com TypeScript
- **Vite** 5.2.0 (bundler e dev server)
- **Styled Components** 6.1.11 para estilização
- **React Router** 6.23.1 para roteamento
- **Chart.js** 4.4.3 + react-chartjs-2 para gráficos
- **Axios** 1.7.2 para comunicação com API
- **date-fns** 3.6.0 para manipulação de datas

## Estrutura do Projeto

```
src/
├── @types/            # Definições de tipos TypeScript
├── assets/            # Imagens, fontes, etc.
├── components/        # Componentes reutilizáveis
│   ├── Button/
│   ├── Header/
│   ├── Input/
│   ├── TransactionForm/
│   ├── TransactionList/
│   └── charts/
│       ├── CategoryChart.tsx
│       └── SpendingHistoryChart.tsx
├── contexts/          # Context API (estado global)
│   └── AuthContext.tsx
├── hooks/             # Custom hooks
│   └── useAuth.ts
├── pages/             # Páginas da aplicação
│   ├── Dashboard/
│   ├── Login/
│   └── Register/
├── services/          # Comunicação com APIs
│   └── api.ts
├── styles/            # Estilos globais e tema
│   ├── GlobalStyle.ts
│   └── theme.ts
├── App.tsx            # Componente principal
└── main.tsx           # Ponto de entrada da aplicação
```

## Design System

### Tema Escuro
- Background: `#121214`
- Background Light: `#202024`
- Primary: `#00B37E`
- Text: `#E1E1E6`
- Error/Expense: `#F75A68`
- Income: `#00B37E`

### Componentes Criados
- **Button**: Botão reutilizável com estados hover/disabled
- **Input**: Campo de entrada estilizado
- **Header**: Cabeçalho com logout
- **TransactionForm**: Formulário para criar transações
- **TransactionList**: Lista de transações com delete
- **CategoryChart**: Gráfico de barras por categoria
- **SpendingHistoryChart**: Gráfico de linha temporal

## Scripts Disponíveis

```bash
npm run dev          # Executa em modo de desenvolvimento (porta 5173)
npm run build        # Gera build para produção
npm run preview      # Preview do build de produção
```

## Configuração e Execução

1. **Instalar Dependências:**
   ```bash
   npm install
   ```

2. **Configurar Variáveis de Ambiente:**
   - Copie `.env.example` para `.env`
   - Configure `VITE_API_URL=http://localhost:3333`

3. **Iniciar Servidor de Desenvolvimento:**
   ```bash
   npm run dev
   ```

O frontend estará rodando em `http://localhost:5173`

## Funcionalidades Implementadas

### Autenticação
- ✅ Login com email/senha
- ✅ Cadastro de usuário
- ✅ Context de autenticação
- ✅ Proteção de rotas
- ✅ Logout

### Dashboard
- ✅ Criação de transações (entrada/saída)
- ✅ Listagem de transações
- ✅ Exclusão de transações
- ✅ Gráfico de gastos por categoria
- ✅ Gráfico de histórico (7 dias)
- ✅ Categorização automática via AI

### Design
- ✅ Tema escuro moderno
- ✅ Responsivo
- ✅ Componentes reutilizáveis
- ✅ Estados de loading
- ✅ Feedback visual

## Integração com Backend

- Interceptor Axios para tokens JWT
- Endpoints: `/users`, `/sessions`, `/transactions`
- Tratamento de erros
- Estados de loading

## Responsabilidades

- **Membro 2**: Interface e páginas principais (Login, Register, Dashboard)
- **Membro 3**: Componentes reutilizáveis e design system (Button, Input, Charts)