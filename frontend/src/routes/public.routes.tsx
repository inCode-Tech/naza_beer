import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
