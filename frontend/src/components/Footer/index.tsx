import { Container } from './styles';

export function Footer() {
  const teste = new Date().getFullYear();

  return (
    <Container>
      Desenvolvido por: <b> InCode© </b> - {teste}
    </Container>
  );
}