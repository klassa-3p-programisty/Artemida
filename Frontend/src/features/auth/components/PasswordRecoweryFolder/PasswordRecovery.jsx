import React, { useState } from "react";
import "./PasswordRecovery.css";

function PasswordRecovery() {
  const [login, setLogin] = useState("");

  async function recoverPassword() {
    if (login === "") {
      alert("Enter your login");
      return;
    }

    const data = {
      login: login,
    };

    await fetch("https://httpbin.org/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    alert("Request sent!");
  }

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
        <div className="form">
          <p className="subtitle">PASSWORD RECOVERY</p>

          <h1>Forgot your password?</h1>

          <p>Enter your school login to recover your password.</p>

          <label>Login</label>

          <input
            type="text"
            placeholder="Enter your school login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />

          <button onClick={recoverPassword}>Recover your Password →</button>

          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
}

export default PasswordRecovery;
