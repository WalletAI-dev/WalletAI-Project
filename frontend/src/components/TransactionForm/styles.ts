import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
`;

export const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

export const InputGroup = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
`;

export const TypeSelector = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

interface TypeButtonProps {
  variant: 'income' | 'expense';
  active: boolean;
}

export const TypeButton = styled.button<TypeButtonProps>`
  padding: 1rem;
  border: 1px solid ${({ theme, variant }) => 
    variant === 'income' ? theme.colors.income : theme.colors.expense
  };
  border-radius: 6px;
  background-color: ${({ theme, active, variant }) => 
    active 
      ? variant === 'income' 
        ? theme.colors.income 
        : theme.colors.expense
      : 'transparent'
  };
  color: ${({ theme, active }) => 
    active ? theme.colors.white : theme.colors.text
  };
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme, variant }) => 
      variant === 'income' ? theme.colors.income : theme.colors.expense
    };
    color: ${({ theme }) => theme.colors.white};
  }
`;