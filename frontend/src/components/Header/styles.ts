import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  padding: 1.5rem 2rem;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.error};
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.white};
  }
`;