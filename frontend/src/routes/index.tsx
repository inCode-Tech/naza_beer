import { useAuth } from '../Context/AuthContext';
import { PublicRoutes } from './public.routes';
import { PrivateRoutes } from './private.routes';

export function Routes() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />;
}
