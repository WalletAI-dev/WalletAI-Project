import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/useAuth';
import { Container, Form, Title } from './styles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    await signIn({ email, password });
  }

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <Title>WalletAI</Title>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Entrar</Button>
        <Link to="/register">Não tem uma conta? Cadastre-se</Link>
      </Form>
    </Container>
  );
}