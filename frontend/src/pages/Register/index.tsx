import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/useAuth';
import { Container, Form, Title } from './styles';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useAuth();

  async function handleRegister(event: FormEvent) {
    event.preventDefault();
    await signUp({ name, email, password });
  }

  return (
    <Container>
      <Form onSubmit={handleRegister}>
        <Title>Criar Conta</Title>
        <Input
          type="text"
          placeholder="Nome completo"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
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
          minLength={6}
        />
        <Button type="submit">Cadastrar</Button>
        <Link to="/">Já tem uma conta? Faça login</Link>
      </Form>
    </Container>
  );
}