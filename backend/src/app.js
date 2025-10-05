const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');
const AppError = require('./errors/AppError');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// Middleware para capturar erros de validação do Celebrate
app.use(errors());

// Middleware para capturar erros da aplicação
app.use((err, request, response, next) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

module.exports = app;