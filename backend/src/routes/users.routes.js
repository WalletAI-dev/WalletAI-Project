const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const UsersController = require('../controllers/UsersController');

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  usersController.create
);

module.exports = usersRouter;