import { useState } from "react";
import styles from "./styles/LoginPage.module.css";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className={styles.wrapper}>
      <div className={styles.left}>
        <article className={styles.artLogo}>
          <div className={styles.logoBox}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M1.66669 3.33331H7.50002C8.16306 3.33331 8.79895 3.59671 9.26779 4.06555C9.73663 4.53439 10 5.17027 10 5.83331V16.6666C10 16.2246 9.82443 15.8007 9.51186 15.4881C9.1993 15.1756 8.77538 15 8.33335 15H1.66669V3.33331Z" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" stroke="#3F5121" />
              <path d="M18.3333 3.33331H12.5C11.837 3.33331 11.2011 3.59671 10.7322 4.06555C10.2634 4.53439 10 5.17027 10 5.83331V16.6666C10 16.2246 10.1756 15.8007 10.4882 15.4881C10.8007 15.1756 11.2246 15 11.6667 15H18.3333V3.33331Z" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" stroke="#3F5121" />
            </svg>
          </div>
          <p className={styles.mainText}>ARTEMIDA</p>
        </article>

        <article className={styles.heroArticle}>
          <div className={styles.tagline}>
            <span className={styles.taglineLine}></span>
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
            <form className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="login" className={styles.label}>
                  Login
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.iconSlot}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M16.5 9H12L10.5 11.25H7.5L6 9H1.5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" stroke="#8C9278" />
                      <path d="M4.125 3.75H13.875L16.5 9V13.5C16.5 13.8978 16.342 14.2794 16.0607 14.5607C15.7794 14.842 15.3978 15 15 15H3C2.60218 15 2.22064 14.842 1.93934 14.5607C1.65804 14.2794 1.5 13.8978 1.5 13.5V9L4.125 3.75Z" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" stroke="#8C9278" />
                    </svg>
                  </span>
                  <input
                    id="login"
                    name="login"
                    type="email"
                    autoComplete="username"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.iconSlot}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M4.5 8.25H13.5C14.3284 8.25 15 8.92157 15 9.75V14.25C15 15.0784 14.3284 15.75 13.5 15.75H4.5C3.67157 15.75 3 15.0784 3 14.25V9.75C3 8.92157 3.67157 8.25 4.5 8.25Z" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" stroke="#8C9278" />
                      <path d="M6 8.25V5.25C6 4.45435 6.31607 3.69129 6.87868 3.12868C7.44129 2.56607 8.20435 2.25 9 2.25C9.79565 2.25 10.5587 2.56607 11.1213 3.12868C11.6839 3.69129 12 4.45435 12 5.25V8.25" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" stroke="#8C9278" />
                    </svg>
                  </span>

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className={`${styles.input} ${styles.passwordInput}`}
                  />

                  <button
                    type="button"
                    className={styles.eyeSlot}
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M1.5 9C1.5 9 4.125 3.75 9 3.75C13.875 3.75 16.5 9 16.5 9C16.5 9 13.875 14.25 9 14.25C4.125 14.25 1.5 9 1.5 9Z" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" stroke="#6E7563" />
                      <path d="M11.25 9C11.25 10.2426 10.2426 11.25 9 11.25C7.75736 11.25 6.75 10.2426 6.75 9C6.75 7.75736 7.75736 6.75 9 6.75C10.2426 6.75 11.25 7.75736 11.25 9Z" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" stroke="#6E7563" />
                      {showPassword && (
                        <path d="M2.5 2.5L15.5 15.5" strokeWidth="1.2" strokeLinecap="round" stroke="#6E7563" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              <div className={styles.forgotWrapper}>
                <a href="#forgot-password" className={styles.forgotLink}>
                  Forgot password?
                </a>
              </div>

              <button type="submit" className={styles.submitBtn}>
                <span>Sign in</span>
                <span className={styles.arrowSlot}>
                  <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M0.675003 5.17505H11.175M6.675 9.67505L11.175 5.17505L6.675 0.675049" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" stroke="white" />
                  </svg>
                </span>
              </button>
            </form>
          </article>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;