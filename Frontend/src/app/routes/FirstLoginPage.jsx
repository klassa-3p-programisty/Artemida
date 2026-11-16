// DEV-01: страница /first-login. Приветствие с именем показывается, если оно есть в auth state.
import { ChangePasswordForm, useAuth } from '../../features/auth'
import { AuthLayout } from '../../layouts'
import { navigate } from './navigation'

export function FirstLoginPage() {
  const { user } = useAuth()

  return (
    <AuthLayout>
      <ChangePasswordForm userName={user?.name} onContinue={() => navigate('/dashboard')} />
    </AuthLayout>
  )
}
