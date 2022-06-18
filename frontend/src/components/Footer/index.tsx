import { Container } from './styles';

export function Footer() {
  const date = new Date().getFullYear();

  return (
    <Container>
      <b>Equipe de desenvolvimento</b>
      <p>Wesley Estevam Do Monte | Davi Martins Aguiar</p>
      <p>Gean Cezar Moreira da Silva | Soter Caio Garcias Castro</p>
    </Container>
  );
}