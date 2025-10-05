# AI Service - WalletAI

Serviço de inteligência artificial para categorização automática de transações financeiras usando FastAPI e Machine Learning.

## Tecnologias

- **FastAPI** - Framework web moderno e rápido
- **Scikit-learn** - Machine Learning
- **Pandas** - Manipulação de dados
- **NLTK** - Processamento de linguagem natural
- **Uvicorn** - Servidor ASGI

## Estrutura do Projeto

```
ai-service/
├── .gitignore
├── requirements.txt          # Dependências Python
├── train_data.csv           # Dataset para treinamento
├── train.py                 # Script de treinamento
├── Dockerfile               # Container Docker
├── README.md                # Esta documentação
└── app/
    ├── __init__.py
    ├── categorizer.py       # Lógica de predição
    ├── main.py             # API FastAPI
    └── model/              # Modelos treinados
        └── .gitkeep
```

## Dataset de Treinamento

O arquivo `train_data.csv` contém exemplos de transações categorizadas:

### Categorias Disponíveis:
- **Alimentação**: Restaurantes, supermercados, padarias
- **Transporte**: Uber, gasolina, ônibus, estacionamento
- **Moradia**: Aluguel, contas de luz/água, internet
- **Lazer**: Cinema, Netflix, shows, livros
- **Saúde**: Consultas médicas, farmácia, academia
- **Educação**: Cursos, material escolar
- **Outros**: Demais categorias

## Como Executar

### 1. Criar Ambiente Virtual (Recomendado)

```bash
python -m venv venv

# No macOS/Linux:
source venv/bin/activate

# No Windows:
.\venv\Scripts\activate
```

### 2. Instalar Dependências

```bash
pip install -r requirements.txt
```

### 3. Treinar o Modelo

```bash
python train.py
```

Este comando irá:
- Carregar os dados do `train_data.csv`
- Pré-processar os textos (remoção de pontuação, stopwords)
- Treinar um classificador Naive Bayes com TF-IDF
- Salvar o modelo em `app/model/transaction_classifier.pkl`

### 4. Iniciar a API

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 5000
```

### 5. Testar a API

Acesse a documentação interativa em: **http://localhost:5000/docs**

## Endpoints da API

### `GET /`
- **Descrição**: Verificação de saúde da API
- **Resposta**: `{"message": "WalletAI - AI Service está funcionando!"}`

### `POST /categorize`
- **Descrição**: Categoriza uma transação
- **Body**:
  ```json
  {
    "description": "Almoço no restaurante"
  }
  ```
- **Resposta**:
  ```json
  {
    "category": "Alimentação"
  }
  ```

## Algoritmo de Machine Learning

### Pré-processamento:
1. Conversão para minúsculas
2. Remoção de pontuação
3. Remoção de stopwords em português
4. Tokenização

### Modelo:
- **Vetorização**: TF-IDF (Term Frequency-Inverse Document Frequency)
- **Classificador**: Multinomial Naive Bayes
- **Pipeline**: Scikit-learn Pipeline combinando vetorização + classificação

### Métricas:
- Divisão treino/teste: 80%/20%
- Avaliação por acurácia
- Validação estratificada

## Expansão do Dataset

Para melhorar a precisão, adicione mais exemplos no `train_data.csv`:

```csv
description,category
"Nova transação","Nova categoria"
```

Depois re-execute o treinamento:
```bash
python train.py
```

## Integração com Backend

O backend Node.js faz requisições para `http://localhost:5000/categorize`:

```javascript
const response = await axios.post('/categorize', {
  description: 'Compras no supermercado'
});
console.log(response.data.category); // "Alimentação"
```

## Docker

```bash
# Build da imagem
docker build -t walletai-ai-service .

# Executar container
docker run -p 5000:5000 walletai-ai-service
```

## Responsabilidade

**Membro 4**: Desenvolvimento completo do serviço de IA com foco em categorização automática de transações financeiras.