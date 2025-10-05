# Frontend WalletAI - React + TypeScript

Interface do usuário para o sistema WalletAI, desenvolvida com React e TypeScript.

## Tecnologias

- **React** 18.2.0
- **TypeScript** 5.2.2
- **Material-UI** 5.14.5
- **React Router** 6.15.0
- **Axios** para comunicação com API
- **Styled Components** para estilização
- **Recharts** para gráficos

## Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── pages/          # Páginas da aplicação
├── contexts/       # Context API (estado global)
├── services/       # Comunicação com APIs
├── types/          # Definições de tipos TypeScript
├── assets/         # Imagens, fontes, etc.
├── App.tsx         # Componente principal
└── index.tsx       # Ponto de entrada da aplicação
```

## Scripts Disponíveis

```bash
npm start          # Executa em modo de desenvolvimento
npm run build      # Gera build para produção
npm test           # Executa testes
npm run eject      # Ejeta configuração do Create React App
```

## Configuração

1. Copie `.env.example` para `.env`
2. Configure as variáveis de ambiente necessárias
3. Execute `npm install` para instalar dependências
4. Execute `npm start` para iniciar o servidor de desenvolvimento

## Responsabilidades

- **Membro 2**: Interface e páginas principais
- **Membro 3**: Componentes reutilizáveis e design system