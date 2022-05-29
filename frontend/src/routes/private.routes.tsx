import { Routes, Route, Navigate } from 'react-router-dom';

import { Navbar } from '../components/Navbar';
import { Home } from '../pages/Home';
import { Players } from '../pages/Players';
import { Victories } from '../pages/Victories';
import { Goals } from '../pages/Goals';
import { Payments } from '../pages/Payments';

export function PrivateRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/inicio" element={<Home />} />
        <Route path="/jogadores" element={<Players />} />
        <Route path="/vitorias" element={<Victories />} />
        <Route path="/gols" element={<Goals />} />
        <Route path="/pagamentos" element={<Payments />} />

        <Route path="*" element={<Navigate to="/inicio" />} />
      </Routes>
    </>
  );
}
