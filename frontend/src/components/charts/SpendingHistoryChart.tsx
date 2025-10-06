import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format, subDays, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import api from '../../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SpendingData {
  date: string;
  income: number;
  expense: number;
}

interface SpendingHistoryChartProps {
  refresh: number;
}

export default function SpendingHistoryChart({ refresh }: SpendingHistoryChartProps) {
  const [data, setData] = useState<SpendingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadSpendingHistory();
  }, [refresh]);

  async function loadSpendingHistory() {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/transactions');
      const transactions = response.data;

      // Criar dados dos últimos 7 dias
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = startOfDay(subDays(new Date(), i));
        return format(date, 'yyyy-MM-dd');
      }).reverse();

      const spendingData = last7Days.map(date => {
        const dayTransactions = transactions.filter((t: any) => {
          const transactionDate = format(new Date(t.date), 'yyyy-MM-dd');
          return transactionDate === date;
        });

        const income = dayTransactions
          .filter((t: any) => t.type === 'income')
          .reduce((sum: number, t: any) => sum + parseFloat(t.amount), 0);

        const expense = dayTransactions
          .filter((t: any) => t.type === 'expense')
          .reduce((sum: number, t: any) => sum + parseFloat(t.amount), 0);

        return {
          date: format(new Date(date), 'dd/MM', { locale: ptBR }),
          income,
          expense,
        };
      });

      setData(spendingData);
    } catch (error) {
      console.error('Erro ao carregar histórico de gastos:', error);
      setError('Erro ao carregar dados do gráfico');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Carregando gráfico...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'Entradas',
        data: data.map(item => item.income),
        borderColor: '#00B37E',
        backgroundColor: '#00B37E',
        tension: 0.4,
      },
      {
        label: 'Saídas',
        data: data.map(item => item.expense),
        borderColor: '#F75A68',
        backgroundColor: '#F75A68',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#E1E1E6',
        },
      },
      title: {
        display: true,
        text: 'Entradas vs Saídas (Últimos 7 dias)',
        color: '#E1E1E6',
      },
    },
    scales: {
      y: {
        ticks: {
          color: '#C4C4CC',
          callback: function(value: any) {
            return 'R$ ' + parseFloat(value).toFixed(2);
          },
        },
        grid: {
          color: '#323238',
        },
      },
      x: {
        ticks: {
          color: '#C4C4CC',
        },
        grid: {
          color: '#323238',
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}