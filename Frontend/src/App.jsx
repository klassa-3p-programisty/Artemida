import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import PasswordRecoveryPage from './pages/PasswordRecoveryPage/PasswordRecoveryPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Button from './components/welcome'

function App() {
  const [count, setCount] = useState(0)

  return (      
    <Button/>
  )
}

export default App
