import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { PublicRankingVictories } from '../pages/PublicRanking/Victories';
import { PublicRankingGoals } from '../pages/PublicRanking/Goals';

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/relatorio/vitorias" element={<PublicRankingVictories />} />
      <Route path="/relatorio/gols" element={<PublicRankingGoals />} />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
