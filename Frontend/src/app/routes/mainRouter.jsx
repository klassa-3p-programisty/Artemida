import { Routes, Route } from 'react-router';
import { PAGES } from './pages';
import LoginPage from '../../pages/LoginPage';

export function MainRouter() {
  return (
    <Routes>
      <Route path={PAGES.login} element={<LoginPage />} />
    </Routes>
  );
}
