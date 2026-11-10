
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import { BookIcon, MailIcon, ArrowRightIcon } from '../../components/ui/icons.jsx';

import '../Login/LoginPage.css';
import './PasswordRecovery.css';

export default function PasswordRecovery() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) {
      setError('Enter your email address.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.');
      return;
    }

    setError('');

    // Temporary frontend simulation.
    // Real email delivery will be connected to the backend later.
    setSubmitted(true);
  }

  return (
    <main className="login recovery">
      <aside className="login__brand">
        <div className="login__logo">
          <span className="login__logo-mark">
            <BookIcon />
          </span>

          <span className="login__logo-name">
            ARTEMIDA
          </span>
        </div>

        <div className="login__hero">
          <p className="login__tagline">
            <span
              className="login__tagline-line"
              aria-hidden="true"
            />
            A little more focus. A lot more possible.
          </p>

          <h1 className="login__headline">
            Your school day.
            <br />
            <span className="login__headline-accent">
              All in one place.
            </span>
          </h1>
        </div>

        <p className="login__about">
          Less time keeping track. More time moving forward.
          Your assignments, conversations and next big ideas
          start here.
        </p>
      </aside>

      <section className="login__panel">
        <form
          className="recovery__form"
          onSubmit={handleSubmit}
          noValidate
        >
          {!submitted ? (
            <>
              <header className="login__header">
                <p className="login__eyebrow">
                  ACCOUNT RECOVERY
                </p>

                <h2 className="login__title">
                  Forgot your password?
                </h2>

                <p className="login__subtitle">
                  Enter the email address associated with
                  your school account. We'll send you
                  instructions to reset your password.
                </p>
              </header>

              <div className="recovery__fields">
                <Input
                  label="Email address"
                  name="email"
                  type="email"
                  icon={<MailIcon />}
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError('');
                  }}
                  error={error}
                />
              </div>

              <Button type="submit" block>
                Send recovery link
                <ArrowRightIcon width={14} height={14} />
              </Button>
            </>
          ) : (
            <div className="recovery__success">
              <div className="recovery__success-icon">
                <MailIcon />
              </div>

              <p className="login__eyebrow">
                REQUEST SUBMITTED
              </p>

              <h2 className="login__title">
                Check your inbox.
              </h2>

              <p className="login__subtitle">
                If an account exists for this email address,
                recovery instructions will be sent to it.
              </p>

              <button
                type="button"
                className="recovery__retry"
                onClick={() => setSubmitted(false)}
              >
                Try another email
              </button>
            </div>
          )}

          <Link
            className="recovery__back"
            to="/login"
          >
            ← Back to login
          </Link>
        </form>
      </section>
    </main>
  );
}
