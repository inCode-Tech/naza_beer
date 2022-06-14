import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import { Routes } from './routes';
import { GlobalStyles } from './globalStyles/styles';
import { ToastContainer } from 'react-toastify';

export function App() {
  return (
    <>
      <GlobalStyles />
      <ToastContainer autoClose={2000} position="bottom-right" />
      <BrowserRouter>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
