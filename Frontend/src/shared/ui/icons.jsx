// Иконки (inline SVG, без сторонних библиотек). Цвет берётся из currentColor.
const baseProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
}

export function LockIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  )
}

export function EyeIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function EyeOffIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3 3l18 18" />
      <path d="M6.6 7.6C3.7 9.3 2 12 2 12s3.5 6 10 6c1.6 0 3-.4 4.2-1" />
      <path d="M10.6 6.1A10 10 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.2 3.9" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  )
}

export function ArrowRightIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  )
}

export function BookIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3 5h7a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H3z" />
      <path d="M21 5h-7a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h7z" />
    </svg>
  )
}
