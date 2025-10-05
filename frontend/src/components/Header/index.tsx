import { useAuth } from '../../hooks/useAuth';
import { Container, Logo, UserInfo, LogoutButton } from './styles';

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <Logo>WalletAI</Logo>
      <UserInfo>
        <span>Olá, {user?.name}</span>
        <LogoutButton onClick={signOut}>Sair</LogoutButton>
      </UserInfo>
    </Container>
  );
}