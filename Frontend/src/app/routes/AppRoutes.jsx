import { useEffect } from 'react'
import { DashboardStub } from './DashboardStub'
import { FirstLoginPage } from './FirstLoginPage'
import { navigate } from './navigation'
import { usePathname } from './usePathname'
import PasswordRecovery from '../../features/auth/components/PasswordRecoweryFolder/PasswordRecovery'

const ROUTES = {
  '/first-login': FirstLoginPage,
  '/dashboard': DashboardStub,
  '/password-recovery': PasswordRecovery,
}

export function AppRoutes() {
  const pathname = usePathname()
  const Page = ROUTES[pathname]

  // Неизвестный путь (в том числе "/") временно ведёт на /first-login.
  useEffect(() => {
    if (!Page) navigate('/first-login', { replace: true })
  }, [Page])

  return Page ? <Page /> : null
}
