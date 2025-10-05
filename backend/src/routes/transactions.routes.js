const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const TransactionsController = require('../controllers/TransactionsController');
const authMiddleware = require('../middlewares/auth');

const transactionsRouter = Router();
const transactionsController = new TransactionsController();

// Todas as rotas abaixo exigem autenticação
transactionsRouter.use(authMiddleware);

transactionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      amount: Joi.number().positive().required(),
      type: Joi.string().valid('expense', 'income').required(),
      date: Joi.date().iso().required(),
    },
  }),
  transactionsController.create
);

transactionsRouter.get('/', transactionsController.index);

transactionsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  transactionsController.delete
);

module.exports = transactionsRouter;