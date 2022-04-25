import { FormEvent, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';

import { Container } from './styles';

import { toast } from 'react-toastify';

export function Login() {
  const { signIn, loading, changeLoading } = useAuth();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    changeLoading(true);

    const response = await signIn({ user, password });
    if (response !== 'success') {
      toast.error("Informações inválidas!");
    } else {
      toast.dismiss();
    }

    changeLoading(false);
  }

  return (
    <Container>
      <div className="content">
        <h1>NAZA BEER</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor="user">
          <p>Usuário</p>
          <input 
            id="user" 
            type="text" 
            value={user} 
            onChange={e => setUser(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          <p>Senha</p>
          <input 
            id="password" 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">
          {!loading ? 'Entrar' : <div className="loader" />}
        </button>
        </form>
      </div>
    </Container>
  );
}