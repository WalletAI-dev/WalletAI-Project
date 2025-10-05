import styled from 'styled-components';

export const InputContainer = styled.input`
  width: 100%;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }
`;