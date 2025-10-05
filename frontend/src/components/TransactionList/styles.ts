import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  padding: 2rem;
  border-radius: 8px;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
`;

export const TransactionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const TransactionInfo = styled.div`
  flex: 1;
`;

export const TransactionDescription = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  margin-bottom: 0.25rem;

  span {
    display: block;
    color: ${({ theme }) => theme.colors.textLight};
    font-size: 0.875rem;
    font-weight: 400;
  }
`;

export const TransactionDate = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.875rem;
`;

interface TransactionAmountProps {
  type: 'income' | 'expense';
}

export const TransactionAmount = styled.div<TransactionAmountProps>`
  color: ${({ theme, type }) => 
    type === 'income' ? theme.colors.income : theme.colors.expense
  };
  font-weight: 700;
  font-size: 1.125rem;
  margin-right: 1rem;
`;

export const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.error};
  font-size: 1.25rem;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.error}20;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
  padding: 2rem;
  font-style: italic;
`;