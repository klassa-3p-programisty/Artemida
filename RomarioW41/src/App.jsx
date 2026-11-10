import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/Login/LoginPage.jsx";
import FirstLogin from "./pages/FirstLogin/FirstLogin.jsx";
import PasswordRecovery from "./pages/PasswordRecovery/PasswordRecovery.jsx";

function PasswordRecoveryPlaceholder() {
  return (
    <div>
      <h2>Password recovery</h2>
      <a href="/login">Back to login</a>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/first-login" element={<FirstLogin />} />

      <Route path="/password-recovery" element={<PasswordRecovery />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
