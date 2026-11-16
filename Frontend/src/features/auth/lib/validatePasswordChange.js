// DEV-04: валидация формы смены первоначального пароля.
// ВАЖНО: правила ниже — ДОПУЩЕНИЕ. Их нужно синхронизировать с Backend.
export const PASSWORD_RULES = {
  minLength: 8,
  requireLetter: true,
  requireDigit: true,
}

/**
 * Проверяет значения формы. Пароли НЕ модифицируются (без trim) — как в требованиях.
 * @param {{ currentPassword: string, newPassword: string, confirmPassword: string }} values
 * @returns {Partial<Record<'currentPassword' | 'newPassword' | 'confirmPassword', string>>}
 *   Пустой объект — ошибок нет.
 */
export function validatePasswordChange({ currentPassword, newPassword, confirmPassword }) {
  const errors = {}

  if (!currentPassword) {
    errors.currentPassword = 'Enter your current password'
  }

  if (!newPassword) {
    errors.newPassword = 'Enter a new password'
  } else if (newPassword.length < PASSWORD_RULES.minLength) {
    errors.newPassword = `At least ${PASSWORD_RULES.minLength} characters`
  } else if (PASSWORD_RULES.requireLetter && !/\p{L}/u.test(newPassword)) {
    errors.newPassword = 'Include at least one letter'
  } else if (PASSWORD_RULES.requireDigit && !/\d/.test(newPassword)) {
    errors.newPassword = 'Include at least one digit'
  } else if (newPassword === currentPassword) {
    errors.newPassword = 'New password must differ from the current one'
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Confirm your new password'
  } else if (confirmPassword !== newPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return errors
}
