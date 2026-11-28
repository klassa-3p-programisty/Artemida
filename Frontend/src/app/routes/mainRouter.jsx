import { Routes, Route, Navigate } from "react-router";
import { PAGES } from "./pages";
import LoginPage from "../../pages/LoginPage";

export function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={PAGES.login} replace />} />
      <Route path={PAGES.login} element={<LoginPage />} />
    </Routes>
  );
}