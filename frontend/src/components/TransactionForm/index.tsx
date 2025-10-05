import { FormEvent, useState } from 'react';
import { format } from 'date-fns';
import Button from '../Button';
import Input from '../Input';
import api from '../../services/api';
import { 
  Container, 
  Form, 
  Title, 
  InputGroup, 
  TypeSelector, 
  TypeButton 
} from './styles';

interface TransactionFormProps {
  onTransactionCreated: () => void;
}

export default function TransactionForm({ onTransactionCreated }: TransactionFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      await api.post('/transactions', {
        description,
        amount: parseFloat(amount),
        type,
        date: new Date(date).toISOString(),
      });

      // Limpar formulário
      setDescription('');
      setAmount('');
      setType('expense');
      setDate(format(new Date(), 'yyyy-MM-dd'));
      
      onTransactionCreated();
    } catch (error) {
      console.error('Erro ao criar transação:', error);
      alert('Erro ao criar transação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Title>Nova Transação</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        
        <Input
          type="number"
          placeholder="Valor"
          step="0.01"
          min="0"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />

        <InputGroup>
          <Input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </InputGroup>

        <TypeSelector>
          <TypeButton
            type="button"
            variant="income"
            active={type === 'income'}
            onClick={() => setType('income')}
          >
            Entrada
          </TypeButton>
          <TypeButton
            type="button"
            variant="expense"
            active={type === 'expense'}
            onClick={() => setType('expense')}
          >
            Saída
          </TypeButton>
        </TypeSelector>

        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </Form>
    </Container>
  );
}