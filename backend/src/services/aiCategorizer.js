const axios = require('axios');
const AppError = require('../errors/AppError');

// Cria uma instância do Axios com a URL base do serviço de IA
const aiApi = axios.create({
  baseURL: process.env.AI_SERVICE_BASE_URL,
});

async function categorizeTransaction(description) {
  try {
    const response = await aiApi.post('/categorize', { description });
    
    // A API de IA deve retornar um JSON como {"category": "Alimentação"}
    if (!response.data || !response.data.category) {
      throw new Error('Invalid response from AI Service');
    }

    return { categoryName: response.data.category };

  } catch (error) {
    console.error('Error calling AI Service:', error.message);
    // Em caso de falha, podemos definir uma categoria padrão ou lançar um erro.
    // Lançar um erro é mais explícito sobre o problema.
    throw new AppError('Could not categorize transaction.', 503); // 503 Service Unavailable
  }
}

module.exports = { categorizeTransaction };