import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const pwRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  return (
    <div className="login-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2 style={{ color: "#455486" }}>Log In</h2>
        {showError()}
        <input
          required
          className="login-input"
          placeholder="Email"
          type="email"
          ref={emailRef}></input>
        <input
          required
          className="login-input"
          placeholder="Password"
          type="password"
          ref={pwRef}></input>
        <button className="login-button">Sign In</button>
      </form>
      {/*<button className="login-button">Skip</button>*/}
      <br />
      <Link to="/forgot-password">Forgot Password?</Link>
    </div>
  );

  function showError() {
    if (error) {
      return <div className="error-message">{error}</div>;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, pwRef.current.value);
      history.push("/");
    } catch {
      setError("Log in failed");
    }
    setLoading(false);
  }
}
