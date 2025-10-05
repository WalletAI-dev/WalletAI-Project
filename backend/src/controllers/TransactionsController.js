const prisma = require('../lib/prisma');
const AppError = require('../errors/AppError');
const { categorizeTransaction } = require('../services/aiCategorizer');

class TransactionsController {
  async create(request, response) {
    const { description, amount, type, date } = request.body;
    const user_id = request.user.id;

    let categoryName = 'Outros'; // Categoria padrão caso a transação seja 'income'

    // A chamada ao serviço de IA só ocorre para despesas ('expense')
    if (type === 'expense') {
        const result = await categorizeTransaction(description);
        categoryName = result.categoryName;
    }
    
    const category = await prisma.category.findUnique({
      where: { name: categoryName },
    });

    if (!category) {
      throw new AppError(`Category '${categoryName}' not found.`, 404);
    }

    const transaction = await prisma.transaction.create({
      data: {
        description,
        amount,
        type,
        date: new Date(date),
        user_id,
        category_id: category.id,
      },
      include: {
        category: true, // Inclui os dados da categoria na resposta
      },
    });

    return response.status(201).json(transaction);
  }

  async index(request, response) {
    const user_id = request.user.id;

    const transactions = await prisma.transaction.findMany({
      where: { user_id },
      include: {
        category: {
          select: { name: true },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    return response.json(transactions);
  }

  async delete(request, response) {
    const { id } = request.params;
    const user_id = request.user.id;

    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw new AppError('Transaction not found.', 404);
    }

    if (transaction.user_id !== user_id) {
      throw new AppError('You do not have permission to delete this transaction.', 403);
    }

    await prisma.transaction.delete({
      where: { id },
    });

    return response.status(204).send();
  }
}

module.exports = TransactionsController;