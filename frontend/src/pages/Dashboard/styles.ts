import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

export const MainSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ChartsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ChartContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  padding: 2rem;
  border-radius: 8px;
  height: 400px;

  canvas {
    max-height: 100% !important;
  }
`;