// DEV-02: форма с тремя полями. Использует validatePasswordChange (DEV-04),
// useChangeInitialPassword (DEV-05) и показывает Continue после успеха (DEV-06).
import { useState } from 'react'
import { ArrowRightIcon, Button, PasswordInput } from '../../../shared/ui'
import { validatePasswordChange } from '../lib/validatePasswordChange'
import { useChangeInitialPassword } from '../hooks/useChangeInitialPassword'
import './ChangePasswordForm.css'

const INITIAL_VALUES = { currentPassword: '', newPassword: '', confirmPassword: '' }

const FIELDS = [
  { name: 'currentPassword', label: 'Current Password', autoComplete: 'current-password' },
  { name: 'newPassword', label: 'New Password', autoComplete: 'new-password' },
  { name: 'confirmPassword', label: 'Confirm New Password', autoComplete: 'new-password' },
]

/**
 * @param {{ onContinue: () => void, userName?: string }} props
 *   onContinue — переход на Dashboard; навигацией занимается страница /first-login.
 *   userName — имя для приветствия (DEV-01), если оно есть в auth state.
 */
export function ChangePasswordForm({ onContinue, userName }) {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [clientErrors, setClientErrors] = useState({})
  const { status, error, submit, clearError } = useChangeInitialPassword()

  const isSubmitting = status === 'submitting'

  if (status === 'success') {
    return (
      <div className="change-password" role="status">
        <p className="change-password__eyebrow">All set</p>
        <h1 className="change-password__title">Password changed.</h1>
        <p className="change-password__subtitle">
          You can now continue to your workspace.
        </p>
        <Button fullWidth icon={<ArrowRightIcon />} onClick={onContinue}>
          Continue
        </Button>
      </div>
    )
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setClientErrors((prev) => ({ ...prev, [name]: undefined }))
    if (error) clearError()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const errors = validatePasswordChange(values)
    if (Object.keys(errors).length > 0) {
      setClientErrors(errors)
      return
    }
    submit({ currentPassword: values.currentPassword, newPassword: values.newPassword })
  }

  return (
    <form className="change-password" onSubmit={handleSubmit} noValidate>
      <p className="change-password__eyebrow">
        {userName ? `Welcome, ${userName}` : 'One last step'}
      </p>
      <h1 className="change-password__title">Set your own password.</h1>
      <p className="change-password__subtitle">
        Replace your initial password to continue to your workspace.
      </p>

      {FIELDS.map(({ name, label, autoComplete }) => (
        <PasswordInput
          key={name}
          name={name}
          label={label}
          autoComplete={autoComplete}
          value={values[name]}
          disabled={isSubmitting}
          error={clientErrors[name] ?? (error?.field === name ? error.message : undefined)}
          onChange={handleChange}
        />
      ))}

      {error && !error.field && (
        <p className="change-password__error" role="alert">
          {error.message}
        </p>
      )}

      <Button type="submit" fullWidth loading={isSubmitting} icon={<ArrowRightIcon />}>
        {isSubmitting ? 'Saving…' : 'Save password'}
      </Button>
    </form>
  )
}
