import { BookIcon } from '../shared/ui'
import './AuthLayout.css'

/** Шаблон страниц авторизации: брендовая панель слева, содержимое справа. */
export function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <aside className="auth-layout__brand">
        <div className="auth-layout__logo">
          <span className="auth-layout__logo-mark">
            <BookIcon />
          </span>
          <span>ARTEMIDA</span>
        </div>

        <div className="auth-layout__hero">
          <p className="auth-layout__kicker">A little more focus. A lot more possible.</p>
          <p className="auth-layout__headline">
            Your school day.
            <br />
            <span>All in one place.</span>
          </p>
        </div>

        <p className="auth-layout__note">
          Less time keeping track. More time moving forward. Your assignments,
          conversations and next big ideas start here.
        </p>
      </aside>

      <main className="auth-layout__content">{children}</main>
    </div>
  )
}
