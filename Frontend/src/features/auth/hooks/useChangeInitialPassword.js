// DEV-05 + DEV-06: отправка формы, обработка ошибок, обновление auth state.
import { useCallback, useRef, useState } from 'react'
import { ApiError, changeInitialPassword } from '../api/changeInitialPassword'
import { useAuth } from '../useAuth'

/** Преобразует ошибку API в { field?, message } для UI. */
function toFormError(error) {
  if (!(error instanceof ApiError)) {
    return { message: 'Could not change the password. Please try again.' }
  }
  if (error.status === 0) {
    return { message: 'No connection to the server. Check your internet and try again.' }
  }
  if (error.code === 'INVALID_CURRENT_PASSWORD') {
    return { field: 'currentPassword', message: 'Current password is incorrect' }
  }
  if (error.code === 'WEAK_PASSWORD' || error.status === 422) {
    return { field: 'newPassword', message: 'New password does not meet the requirements' }
  }
  if (error.status === 401) {
    return { message: 'Your session has expired. Please sign in again.' }
  }
  if (error.status === 403) {
    return { message: 'You do not have permission to do this.' }
  }
  if (error.status === 429) {
    return { message: 'Too many attempts. Please wait a moment and try again.' }
  }
  if (error.status >= 500) {
    return { message: 'Server error. Please try again later.' }
  }
  return { message: 'Could not change the password. Please try again.' }
}

/**
 * @returns {{
 *   status: 'idle' | 'submitting' | 'success',
 *   error: { field?: string, message: string } | null,
 *   submit: (values: { currentPassword: string, newPassword: string }) => Promise<boolean>,
 *   clearError: () => void,
 * }}
 */
export function useChangeInitialPassword() {
  const { markPasswordChanged } = useAuth()
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)
  const inFlightRef = useRef(false) // защита от повторной отправки (Enter, двойной клик)

  const submit = useCallback(
    async ({ currentPassword, newPassword }) => {
      if (inFlightRef.current) return false
      inFlightRef.current = true
      setStatus('submitting')
      setError(null)

      try {
        await changeInitialPassword({ currentPassword, newPassword })
        markPasswordChanged() // DEV-06: обновляем auth state
        setStatus('success')
        return true
      } catch (err) {
        setError(toFormError(err))
        setStatus('idle')
        return false
      } finally {
        inFlightRef.current = false
      }
    },
    [markPasswordChanged],
  )

  const clearError = useCallback(() => setError(null), [])

  return { status, error, submit, clearError }
}
