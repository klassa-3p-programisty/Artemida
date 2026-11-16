// ЗАГЛУШКА для проверки перехода по Continue. Заменить страницей из FE-006.
import { useAuth } from '../../features/auth'

export function DashboardStub() {
  const { user } = useAuth()

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Placeholder until FE-006.</p>
      {user && <p>mustChangePassword: {String(user.mustChangePassword)}</p>}
    </main>
  )
}
