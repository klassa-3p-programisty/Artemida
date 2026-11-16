import { AuthProvider } from '../../features/auth'

// ВРЕМЕННО: пока нет FE-003 (GET /auth/me), в mock-режиме подставляем пользователя
// с обязательной сменой пароля. Включается через VITE_USE_MOCK_API=true в .env.local.
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true'
const MOCK_USER = { id: 1, name: 'Demo Student', role: 'Student', mustChangePassword: true }

export function AppProviders({ children }) {
  return <AuthProvider initialUser={USE_MOCK ? MOCK_USER : null}>{children}</AuthProvider>
}
