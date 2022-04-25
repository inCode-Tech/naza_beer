import { Routes, Route, Navigate } from 'react-router-dom';

import { Navbar } from '../components/Navbar';
import { Home } from '../pages/Home';
import { Players } from '../pages/Players';
import { Victories } from '../pages/Victories';
import { Goals } from '../pages/Goals';

export function PrivateRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/inicio" element={<Home />} />
        <Route path="/jogadores" element={<Players />} />
        <Route path="/vitorias" element={<Victories />} />
        <Route path="/gols" element={<Goals />} />

        <Route path="*" element={<Navigate to="/inicio" />} />
      </Routes>
    </>
  );
}
