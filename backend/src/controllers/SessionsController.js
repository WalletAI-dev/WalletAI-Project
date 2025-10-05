const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const prisma = require('../lib/prisma');
const AppError = require('../errors/AppError');

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password_hash);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return response.json({ user: userWithoutPassword, token });
  }
}

module.exports = SessionsController;