const { hash } = require('bcryptjs');
const prisma = require('../lib/prisma');
const AppError = require('../errors/AppError');

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new AppError('Email address already used.');
    }

    const password_hash = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    };

    return response.status(201).json(userWithoutPassword);
  }
}

module.exports = UsersController;