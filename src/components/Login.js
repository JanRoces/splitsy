import React, { useState, useRef } from "react";
import "./style/Login.css";
import logo from "./artwork/splitsy_logo_v7.png";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const emailRef = useRef();
  const pwRef = useRef();
  const pwConRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // checkLogin = () => {
  //   console.log("login clicked");
  // };

  // checkSignup = () => {
  //   console.log("signup clicked");
  // };

  // skipLogin = () => {
  //   console.log("skip clicked");
  // };

  return (
    <div>
      <div className="logo-container">
        <img className="logo" alt="logo" src={logo}></img>
        <h3>Event Finance Organization</h3>
      </div>
      <div className="login-signup-container">
        <div className="login-container">
          <form>
            <h2 style={{ color: "#455486" }}>Log In</h2>
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
          <button className="login-button">Skip</button>
        </div>
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
      </div>
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
    } catch {
      setError("Account already exists");
    }
    setLoading(false);
  }
}
