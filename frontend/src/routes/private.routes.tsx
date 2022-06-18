import { Routes, Route, Navigate } from 'react-router-dom';

import { Navbar } from '../components/Navbar';
import { Home } from '../pages/Home';
import { Players } from '../pages/Players';
import { Victories } from '../pages/Victories';
import { Goals } from '../pages/Goals';
import { Payments } from '../pages/Payments';
import { PublicRankingVictories } from '../pages/PublicRanking/Victories';
import { PublicRankingGoals } from '../pages/PublicRanking/Goals';

export function PrivateRoutes() {
  return (
    <>
      {
        !(
          window.location.pathname === '/relatorio/gols' || 
          window.location.pathname === '/relatorio/vitorias') &&
        (
          <Navbar />
        )
      }
      <Routes>
        <Route path="/inicio" element={<Home />} />
        <Route path="/jogadores" element={<Players />} />
        <Route path="/vitorias" element={<Victories />} />
        <Route path="/gols" element={<Goals />} />
        <Route path="/pagamentos" element={<Payments />} />
        <Route path="/relatorio/vitorias" element={<PublicRankingVictories />} />
        <Route path="/relatorio/gols" element={<PublicRankingGoals />} />

        <Route path="*" element={<Navigate to="/inicio" />} />
      </Routes>
    </>
  );
}
