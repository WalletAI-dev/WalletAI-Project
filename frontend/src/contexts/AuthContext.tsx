import { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

// --- Tipagens ---
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  signUp(credentials: SignUpCredentials): Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface SignInCredentials {
  email: string;
  password: string;
}

type SignUpCredentials = Omit<User, 'id'> & { password: string };


// --- Contexto ---
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);


// --- Provider ---
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = localStorage.getItem('@WalletAI:user');
      const storagedToken = localStorage.getItem('@WalletAI:token');

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
      }
      setLoading(false);
    }
    loadStoragedData();
  }, []);

  const signIn = async ({ email, password }: SignInCredentials) => {
    try {
      const response = await api.post('/sessions', { email, password });
      const { user, token } = response.data;

      setUser(user);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      localStorage.setItem('@WalletAI:user', JSON.stringify(user));
      localStorage.setItem('@WalletAI:token', token);

      navigate('/dashboard');
    } catch (error) {
      console.error('Falha no login', error);
      alert('Email ou senha inválidos.');
    }
  };

  const signUp = async ({ name, email, password }: SignUpCredentials) => {
    try {
      await api.post('/users', { name, email, password });
      alert('Cadastro realizado com sucesso! Faça seu login.');
      navigate('/');
    } catch (error) {
      console.error('Falha no cadastro', error);
      alert('Não foi possível realizar o cadastro. Verifique seus dados.');
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('@WalletAI:user');
    localStorage.removeItem('@WalletAI:token');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}