import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import api from '../../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CategoryData {
  category: string;
  total: number;
}

interface CategoryChartProps {
  refresh: number;
}

export default function CategoryChart({ refresh }: CategoryChartProps) {
  const [data, setData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategoryData();
  }, [refresh]);

  async function loadCategoryData() {
    try {
      setLoading(true);
      const response = await api.get('/transactions');
      const transactions = response.data;

      // Agrupar por categoria (apenas despesas)
      const categoryTotals: { [key: string]: number } = {};
      
      transactions
        .filter((t: any) => t.type === 'expense')
        .forEach((transaction: any) => {
          const category = transaction.category.name;
          categoryTotals[category] = (categoryTotals[category] || 0) + parseFloat(transaction.amount);
        });

      const categoryData = Object.entries(categoryTotals).map(([category, total]) => ({
        category,
        total,
      }));

      setData(categoryData);
    } catch (error) {
      console.error('Erro ao carregar dados de categoria:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Carregando gráfico...</div>;
  }

  if (data.length === 0) {
    return <div>Nenhuma despesa encontrada para exibir no gráfico.</div>;
  }

  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        label: 'Gastos por Categoria (R$)',
        data: data.map(item => item.total),
        backgroundColor: [
          '#F75A68',
          '#00B37E',
          '#8B5CF6',
          '#F59E0B',
          '#06B6D4',
          '#EC4899',
          '#10B981',
        ],
        borderColor: [
          '#F75A68',
          '#00B37E',
          '#8B5CF6',
          '#F59E0B',
          '#06B6D4',
          '#EC4899',
          '#10B981',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Gastos por Categoria',
        color: '#E1E1E6',
      },
    },
    scales: {
      y: {
        ticks: {
          color: '#C4C4CC',
          callback: function(value: any) {
            return 'R$ ' + value.toFixed(2);
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

  return <Bar data={chartData} options={options} />;
}