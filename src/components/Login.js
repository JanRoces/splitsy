import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const pwRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [setLoading] = useState(false);
  const history = useHistory();

  return (
    <div className="container-login">
      <form className="container-form" onSubmit={handleSubmit}>
        <h2 style={{ color: "#455486" }}>Log In</h2>
        {showError()}
        <input
          required
          className="input-login"
          placeholder="Email"
          type="email"
          ref={emailRef}></input>
        <input
          required
          className="input-login"
          placeholder="Password"
          type="password"
          ref={pwRef}></input>
        <button className="button-login">Sign In</button>
      </form>
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
