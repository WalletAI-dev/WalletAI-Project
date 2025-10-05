import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor para adicionar o token em todas as requisições autenticadas
api.interceptors.request.use(config => {
  const token = localStorage.getItem('@WalletAI:token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;