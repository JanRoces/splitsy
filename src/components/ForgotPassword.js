import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import "./style/LoginSignUp.css";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { login, resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className="login-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2 style={{ color: "#455486" }}>Password Reset</h2>
        {showError()}
        <input
          required
          className="login-input"
          placeholder="Email"
          type="email"
          ref={emailRef}></input>
        <button className="login-button">Reset Password</button>
      </form>
      <Link to="/">Log In / Sign Up</Link>
    </div>
  );

  function showError() {
    if (error) {
      return <div className="error-message">{error}</div>;
    } else if (message) {
      return <div className="message">{message}</div>;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }
}
