import { useState } from "react";
import styles from "../../../pages/styles/LoginPage.module.css";

export function PasswordInput({
  id = "password",
  label = "Password",
  name = "password",
  autoComplete = "current-password",
  className = "",
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      <div className={styles.inputWrapper}>
        <span className={styles.iconSlot} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 8.25H13.5C14.3284 8.25 15 8.92157 15 9.75V14.25C15 15.0784 14.3284 15.75 13.5 15.75H4.5C3.67157 15.75 3 15.0784 3 14.25V9.75C3 8.92157 3.67157 8.25 4.5 8.25Z" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke="#8C9278" />
            <path d="M6 8.25V5.25C6 4.45435 6.31607 3.69129 6.87868 3.12868C7.44129 2.56607 8.20435 2.25 9 2.25C9.79565 2.25 10.5587 2.56607 11.1213 3.12868C11.6839 3.69129 12 4.45435 12 5.25V8.25" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke="#8C9278" />
          </svg>
        </span>

        <input
          id={id}
          name={name}
          type={isVisible ? "text" : "password"}
          autoComplete={autoComplete}
          className={`${styles.input} ${styles.passwordInput} ${className}`}
          {...props}
        />

        <button
          type="button"
          onClick={toggleVisibility}
          className={styles.eyeSlot}
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
        >
          {isVisible ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 9C1.5 9 4.125 3.75 9 3.75C13.875 3.75 16.5 9 16.5 9C16.5 9 13.875 14.25 9 14.25C4.125 14.25 1.5 9 1.5 9Z" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke="#6E7563" />
                <path d="M11.25 9C11.25 10.2426 10.2426 11.25 9 11.25C7.75736 11.25 6.75 10.2426 6.75 9C6.75 7.75736 7.75736 6.75 9 6.75C10.2426 6.75 11.25 7.75736 11.25 9Z" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke="#6E7563" />
                <path d="M15.5 2.5L2.5 15.5" stroke-width="1.2" stroke-linecap="round" stroke="#6E7563" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 9C1.5 9 4.125 3.75 9 3.75C13.875 3.75 16.5 9 16.5 9C16.5 9 13.875 14.25 9 14.25C4.125 14.25 1.5 9 1.5 9Z" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke="#6E7563" />
              <path d="M11.25 9C11.25 10.2426 10.2426 11.25 9 11.25C7.75736 11.25 6.75 10.2426 6.75 9C6.75 7.75736 7.75736 6.75 9 6.75C10.2426 6.75 11.25 7.75736 11.25 9Z" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke="#6E7563" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}