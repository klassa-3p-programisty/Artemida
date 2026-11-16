// ДЕМО-ЗАГЛУШКА auth state. Заменить реальным из FE-003.
import { useCallback, useMemo, useState } from 'react'
import { AuthContext } from './authContext'

/**
 * @param {{ initialUser?: object | null, children: import('react').ReactNode }} props
 */
export function AuthProvider({ initialUser = null, children }) {
  const [user, setUser] = useState(initialUser)

  // DEV-06: после успешной смены пароля снимаем флаг принудительной смены.
  const markPasswordChanged = useCallback(() => {
    setUser((prev) => (prev ? { ...prev, mustChangePassword: false } : prev))
  }, [])

  const value = useMemo(
    () => ({ user, setUser, markPasswordChanged }),
    [user, markPasswordChanged],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
