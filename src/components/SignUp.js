import React, { useState, useRef } from "react";
//import "./style/Login.css";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  const emailRef = useRef();
  const pwRef = useRef();
  const pwConRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  return (
    <div className="signup-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
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
          placeholder="Password (Atleast 6 Characters)"
          type="password"
          minLength="6"
          ref={pwRef}></input>
        <input
          required
          className="login-input"
          placeholder="Confirm Password"
          type="password"
          minLength="6"
          ref={pwConRef}></input>
        <button disabled={loading} className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );

  function showError() {
    if (error) {
      return <div className="error-message">{error}</div>;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (pwRef.current.value !== pwConRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, pwRef.current.value);
      history.push("/");
    } catch {
      setError("Account already exists");
    }
    setLoading(false);
  }
}
