import { useState } from 'react';
import Header from '../../components/Header';
import TransactionForm from '../../components/TransactionForm';
import TransactionList from '../../components/TransactionList';
import CategoryChart from '../../components/charts/CategoryChart';
import SpendingHistoryChart from '../../components/charts/SpendingHistoryChart';
import { 
  Container, 
  Content, 
  MainSection, 
  ChartsSection,
  ChartContainer 
} from './styles';

export default function Dashboard() {
  const [refresh, setRefresh] = useState(0);

  function handleTransactionCreated() {
    setRefresh(prev => prev + 1);
  }

  return (
    <Container>
      <Header />
      <Content>
        <MainSection>
          <TransactionForm onTransactionCreated={handleTransactionCreated} />
          <TransactionList refresh={refresh} />
        </MainSection>
        
        <ChartsSection>
          <ChartContainer>
            <CategoryChart refresh={refresh} />
          </ChartContainer>
          <ChartContainer>
            <SpendingHistoryChart refresh={refresh} />
          </ChartContainer>
        </ChartsSection>
      </Content>
    </Container>
  );
}