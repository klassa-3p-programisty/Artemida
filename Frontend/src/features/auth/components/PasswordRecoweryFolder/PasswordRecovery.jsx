import { useEffect, useRef, useState } from "react";
import "./PasswordRecovery.css";

const API_URL = "https://httpbin.org/post";
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === "true";
const REQUEST_TIMEOUT_MS = 10000;
const DEFAULT_RETRY_AFTER_S = 30;
const MAX_RETRY_AFTER_S = 300;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function requestError(status, retryAfter) {
  const error = new Error(`Request failed: ${status}`);
  error.status = status;
  error.retryAfter = retryAfter;
  return error;
}

function parseRetryAfter(header) {
  let seconds = Number(header);
  if (!header || !Number.isFinite(seconds)) {
    const date = Date.parse(header);
    seconds = Number.isNaN(date)
      ? DEFAULT_RETRY_AFTER_S
      : (date - Date.now()) / 1000;
  }
  return Math.min(Math.max(Math.ceil(seconds), 1), MAX_RETRY_AFTER_S);
}

async function sendRecoveryRequest(login) {
  if (USE_MOCK) {
    await sleep(700);
    if (login === "rate") throw requestError(429, 10);
    if (login === "boom") throw requestError(500);
    if (login === "offline") throw requestError(0);
    return;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response;
  try {
    response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login: login }),
      signal: controller.signal,
    });
  } catch {
    throw requestError(0);
  } finally {
    clearTimeout(timer);
  }

  if (response.status === 429) {
    throw requestError(
      429,
      parseRetryAfter(response.headers.get("Retry-After")),
    );
  }
  if (!response.ok) throw requestError(response.status);
}

function getErrorMessage(error) {
  if (error.status === 0) {
    return "No connection to the server. Check your internet and try again.";
  }
  if (error.status >= 500) {
    return "Server error. Please try again later.";
  }
  return "Could not send the request. Please try again.";
}

function PasswordRecovery() {
  const [login, setLogin] = useState("");
  const [status, setStatus] = useState("idle");
  const [loginError, setLoginError] = useState("");
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const inFlightRef = useRef(false);

  const isLoading = status === "loading";

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const timer = setTimeout(() => setCooldown((seconds) => seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  function handleChange(e) {
    setLogin(e.target.value);
    setLoginError("");
    setError("");
  }

  async function recoverPassword(e) {
    e.preventDefault();
    if (inFlightRef.current || cooldown > 0) return;

    const trimmedLogin = login.trim();
    if (trimmedLogin === "") {
      setLoginError("Enter your login");
      return;
    }

    inFlightRef.current = true;
    setStatus("loading");
    setError("");

    try {
      await sendRecoveryRequest(trimmedLogin);
      setStatus("sent");
    } catch (err) {
      if (err.status === 404) {
        setStatus("sent");
        return;
      }
      if (err.status === 429) {
        setCooldown(err.retryAfter ?? DEFAULT_RETRY_AFTER_S);
      } else {
        setError(getErrorMessage(err));
      }
      setStatus("idle");
    } finally {
      inFlightRef.current = false;
    }
  }

  const message = loginError || error || (cooldown > 0 ? "Too many attempts. Please wait before trying again." : "");

  let buttonLabel = "Recover your Password →";
  if (isLoading) buttonLabel = "Sending...";
  else if (cooldown > 0) buttonLabel = `Try again in ${cooldown}s`;

  return (
    <div className="page">
      <div className="left">
        <h2>ARTEMIDA</h2>

        <div>
          <p>A LITTLE MORE FOCUS. A LOT MORE POSSIBLE.</p>
          <h1>
            Your school day.
            <br />
            <span>All in one place.</span>
          </h1>
        </div>

        <p>
          Less time keeping track. More time moving forward. Your assignments,
          conversations and next big ideas start here.
        </p>
      </div>

      <div className="right">
        {status === "sent" ? (
          <div className="form" role="status">
            <p className="subtitle">PASSWORD RECOVERY</p>

            <h1>Check your inbox</h1>

            <p>
              If an account with this login exists, we have sent password
              recovery instructions. It may take a few minutes to arrive.
            </p>

            <a href="/login">Back to Login</a>
          </div>
        ) : (
          <form className="form" onSubmit={recoverPassword} noValidate>
            <p className="subtitle">PASSWORD RECOVERY</p>

            <h1>Forgot your password?</h1>

            <p>Enter your school login to recover your password.</p>

            <label htmlFor="login">Login</label>

            <input
              id="login"
              type="text"
              className={loginError ? "input-error" : ""}
              placeholder="Enter your school login"
              autoComplete="username"
              value={login}
              disabled={isLoading}
              aria-invalid={loginError ? "true" : "false"}
              onChange={handleChange}
            />

            {message && (
              <p className="form-error" role="alert">
                {message}
              </p>
            )}

            <button type="submit" disabled={isLoading || cooldown > 0}>
              {buttonLabel}
            </button>

            <a href="/login">Back to Login</a>
          </form>
        )}
      </div>
    </div>
  );
}

export default PasswordRecovery;