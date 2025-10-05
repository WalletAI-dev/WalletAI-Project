import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  padding: 2.5rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    text-align: center;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Title = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;