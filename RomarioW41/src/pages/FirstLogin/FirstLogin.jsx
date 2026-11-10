
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';
import PasswordInput from '../../components/ui/PasswordInput.jsx';
import { BookIcon } from '../../components/ui/icons.jsx';

import '../Login/LoginPage.css';
import './FirstLogin.css';

export default function FirstLogin({
  onSubmit,
  onSkip,
  isSubmitting = false,
  formError = '',
}) {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    const nextErrors = {};

    if (!password) {
      nextErrors.password = 'Enter your current password.';
    }

    if (!newPassword) {
      nextErrors.newPassword = 'Enter a new password.';
    } else if (newPassword.length < 8) {
      nextErrors.newPassword =
        'Password must contain at least 8 characters.';
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword =
        'Confirm your new password.';
    } else if (newPassword !== confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    if (password && newPassword && password === newPassword) {
      nextErrors.newPassword =
        'New password must be different from the current password.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    if (onSubmit) {
      onSubmit({
        password,
        newPassword,
      });
    }
  }

  function handleSkip() {
    if (isSubmitting) return;

    if (onSkip) {
      onSkip();
    } else {
      navigate('/dashboard');
    }
  }

  return (
    <main className="login firstlogin">
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
          className="firstlogin__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <header className="login__header">
            <p className="login__eyebrow">
              ACCOUNT SECURITY
            </p>

            <h2 className="login__title">
              Create your new password.
            </h2>

            <p className="login__subtitle">
              Before continuing, update your temporary password.
            </p>
          </header>

          {formError && (
            <p className="login__form-error" role="alert">
              {formError}
            </p>
          )}

          <div className="firstlogin__fields">
            <PasswordInput
              label="Password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setErrors((prev) => ({
                  ...prev,
                  password: undefined,
                }));
              }}
              error={errors.password}
            />

            <PasswordInput
              label="New password"
              name="newPassword"
              autoComplete="new-password"
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.target.value);
                setErrors((prev) => ({
                  ...prev,
                  newPassword: undefined,
                  confirmPassword: undefined,
                }));
              }}
              error={errors.newPassword}
            />

            <PasswordInput
              label="Confirm new password"
              name="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                setErrors((prev) => ({
                  ...prev,
                  confirmPassword: undefined,
                }));
              }}
              error={errors.confirmPassword}
            />
          </div>

          <div className="firstlogin__actions">
            <Button
              type="submit"
              block
              loading={isSubmitting}
            >
              Change password and login
            </Button>

            <button
              type="button"
              className="firstlogin__skip"
              onClick={handleSkip}
              disabled={isSubmitting}
            >
              Skip
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
