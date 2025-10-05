import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import api from '../../services/api';
import { 
  Container, 
  Title, 
  TransactionItem, 
  TransactionInfo, 
  TransactionDescription,
  TransactionDate,
  TransactionAmount,
  DeleteButton,
  EmptyState
} from './styles';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  category: {
    name: string;
  };
}

interface TransactionListProps {
  refresh: number;
}

export default function TransactionList({ refresh }: TransactionListProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, [refresh]);

  async function loadTransactions() {
    try {
      setLoading(true);
      const response = await api.get('/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (window.confirm('Tem certeza que deseja deletar esta transação?')) {
      try {
        await api.delete(`/transactions/${id}`);
        setTransactions(prev => prev.filter(transaction => transaction.id !== id));
      } catch (error) {
        console.error('Erro ao deletar transação:', error);
        alert('Erro ao deletar transação. Tente novamente.');
      }
    }
  }

  if (loading) {
    return (
      <Container>
        <Title>Carregando transações...</Title>
      </Container>
    );
  }

  if (transactions.length === 0) {
    return (
      <Container>
        <Title>Transações</Title>
        <EmptyState>
          Nenhuma transação encontrada. Crie sua primeira transação!
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Transações ({transactions.length})</Title>
      {transactions.map(transaction => (
        <TransactionItem key={transaction.id}>
          <TransactionInfo>
            <TransactionDescription>
              {transaction.description}
              <span>{transaction.category.name}</span>
            </TransactionDescription>
            <TransactionDate>
              {format(new Date(transaction.date), 'dd/MM/yyyy', { locale: ptBR })}
            </TransactionDate>
          </TransactionInfo>
          
          <TransactionAmount type={transaction.type}>
            {transaction.type === 'income' ? '+' : '-'} R$ {transaction.amount.toFixed(2)}
          </TransactionAmount>
          
          <DeleteButton onClick={() => handleDelete(transaction.id)}>
            ✕
          </DeleteButton>
        </TransactionItem>
      ))}
    </Container>
  );
}