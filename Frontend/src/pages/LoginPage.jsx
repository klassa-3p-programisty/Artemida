import styles from "./styles/LoginPage.module.css";
import { PasswordInput } from "../features/auth/components/PasswordInput";
import { useLogin } from "../features/auth/hooks/useAuth";
import { useNavigate } from "react-router";
import { PAGES } from "../app/routes/pages";
import { useState } from "react";

function LoginPage() {
  const login = useLogin();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [isCredentialsError, setIsCredentialsError] = useState(false);

  const clearErrors = () => {
    if (errorMessage) setErrorMessage("");
    if (isCredentialsError) setIsCredentialsError(false);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (login.isPending) return;

    const formData = new FormData(e.currentTarget);
    const userLogin = formData.get("login");
    const password = formData.get("password");
    try {
      const data = await login.mutateAsync({
        login: userLogin,
        password,
      });

      if (data?.mustChangePassword) {
        navigate(PAGES.firstLogin);
      } else {
        navigate(PAGES.dashboard);
      }
    } catch (error) {
      if (!error.status) {
        setErrorMessage("Network error. Check your connection.");
      } else if (error.status === 401) {
        setErrorMessage("Incorrect login or password");
        setIsCredentialsError(true);
      } else if (error.status === 429) {
        setErrorMessage("Too many attempts. Try again later.");
      } else {
        setErrorMessage("Server error. Try again later.");
      }
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.left}>
        <article className={styles.artLogo}>
          <div className={styles.logoBox} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.66669 3.33331H7.50002C8.16306 3.33331 8.79895 3.59671 9.26779 4.06555C9.73663 4.53439 10 5.17027 10 5.83331V16.6666C10 16.2246 9.82443 15.8007 9.51186 15.4881C9.1993 15.1756 8.77538 15 8.33335 15H1.66669V3.33331Z" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" stroke="#3F5121" />
              <path d="M18.3333 3.33331H12.5C11.837 3.33331 11.2011 3.59671 10.7322 4.06555C10.2634 4.53439 10 5.17027 10 5.83331V16.6666C10 16.2246 10.1756 15.8007 10.4882 15.4881C10.8007 15.1756 11.2246 15 11.6667 15H18.3333V3.33331Z" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" stroke="#3F5121" />
            </svg>
          </div>
          <p className={styles.mainText}>ARTEMIDA</p>
        </article>

        <article className={styles.heroArticle}>
          <div className={styles.tagline}>
            <span className={styles.taglineLine} aria-hidden="true"></span>
            <p className={styles.taglineText}>
              A LITTLE MORE FOCUS. A LOT MORE POSSIBLE.
            </p>
          </div>
          <h1 className={styles.heroTitle}>
            Your school day.
            <br />
            <span className={styles.heroTitleSecond}>All in one place.</span>
          </h1>
        </article>

        <article className={styles.footerArticle}>
          <p className={styles.footerText}>
            Less time keeping track. More time moving forward. Your
            assignments, conversations and next big ideas start <br />
            here.
          </p>
        </article>
      </div>

      <div className={styles.right}>
        <div className={styles.formContainer}>
          <article className={styles.headerArticle}>
            <p className={styles.eyebrow}>WELCOME TO YOUR WORKSPACE</p>
            <h2 className={styles.title}>Good to see you again.</h2>
            <p className={styles.subtitle}>
              Sign in with your school account to pick up where you left off.
            </p>
          </article>

          <article className={styles.formArticle}>
            <form
              onSubmit={handleSumbit}
              onChange={clearErrors}
              className={styles.form}
              aria-label="Sign in form"
            >
              <div className={styles.inputGroup}>
                <label htmlFor="login" className={styles.label}>
                  Login
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.iconSlot} aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.5 9H12L10.5 11.25H7.5L6 9H1.5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" stroke="#8C9278" />
                      <path d="M4.125 3.75H13.875L16.5 9V13.5C16.5 13.8978 16.342 14.2794 16.0607 14.5607C15.7794 14.842 15.3978 15 15 15H3C2.60218 15 2.22064 14.842 1.93934 14.5607C1.65804 14.2794 1.5 13.8978 1.5 13.5V9L4.125 3.75Z" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" stroke="#8C9278" />
                    </svg>
                  </span>
                  <input
                    id="login"
                    name="login"
                    type="text"
                    autoComplete="username"
                    required
                    className={`${styles.input} ${isCredentialsError ? styles.inputError : ""}`}
                  />
                </div>
              </div>

              <PasswordInput
                id="password"
                name="password"
                label="Password"
                required
                className={isCredentialsError ? styles.inputError : ""}
              />

              {errorMessage && (
                <p className={styles.errorText} role="alert">
                  {errorMessage}
                </p>
              )}

              <div className={styles.forgotWrapper}>
                <a href="#forgot-password" className={styles.forgotLink}>
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={login.isPending}
                className={styles.submitBtn}
              >
                <span>{login.isPending ? "Signing in..." : "Sign in"}</span>
                {!login.isPending && (
                  <span className={styles.arrowSlot} aria-hidden="true">
                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.675003 5.17505H11.175M6.675 9.67505L11.175 5.17505L6.675 0.675049" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" stroke="white" />
                    </svg>
                  </span>
                )}
              </button>
            </form>
          </article>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;