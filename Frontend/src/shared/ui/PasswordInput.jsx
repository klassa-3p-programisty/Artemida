import { useId, useState } from 'react'
import { EyeIcon, EyeOffIcon, LockIcon } from './icons'
import './PasswordInput.css'

/**
 * Поле пароля с иконкой замка и переключателем видимости.
 * @param {{
 *   label: string, name: string, value: string,
 *   onChange: (event: import('react').ChangeEvent<HTMLInputElement>) => void,
 *   error?: string, disabled?: boolean, autoComplete?: string,
 * }} props
 */
export function PasswordInput({
  label,
  name,
  value,
  error,
  disabled = false,
  autoComplete,
  onChange,
}) {
  const id = useId()
  const errorId = `${id}-error`
  const [visible, setVisible] = useState(false)

  return (
    <div className="ui-field">
      <label className="ui-field__label" htmlFor={id}>
        {label}
      </label>
      <div className={`ui-field__control${error ? ' ui-field__control--error' : ''}`}>
        <LockIcon className="ui-field__icon" />
        <input
          id={id}
          className="ui-field__input"
          name={name}
          type={visible ? 'text' : 'password'}
          value={value}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          onChange={onChange}
        />
        <button
          type="button"
          className="ui-field__toggle"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          disabled={disabled}
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      {error && (
        <p id={errorId} className="ui-field__error">
          {error}
        </p>
      )}
    </div>
  )
}
