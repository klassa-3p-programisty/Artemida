import './Button.css'

/**
 * @param {{
 *   children: import('react').ReactNode,
 *   icon?: import('react').ReactNode,
 *   type?: 'button' | 'submit',
 *   loading?: boolean,
 *   disabled?: boolean,
 *   fullWidth?: boolean,
 *   onClick?: () => void,
 * }} props
 */
export function Button({
  children,
  icon = null,
  type = 'button',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
}) {
  const className = `ui-button${fullWidth ? ' ui-button--full' : ''}`
  return (
    <button
      type={type}
      className={className}
      disabled={disabled || loading}
      aria-busy={loading}
      onClick={onClick}
    >
      {children}
      {icon}
    </button>
  )
}
