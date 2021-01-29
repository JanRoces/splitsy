import React, { useState, useRef } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import "./style/LoginSignUp.css";
import logo from "./artwork/splitsy_logo_v7.png";

export default function LoginSignUp() {
  return (
    <div>
      <div className="logo-container">
        <img className="logo" alt="logo" src={logo}></img>
        <h3 className="title">Event Finance Organization</h3>
      </div>
      <div className="login-signup-container">
        <Login />
        <div className="or-container">
          <div className="or-circle">OR</div>
        </div>
        <SignUp />
      </div>
    </div>
  );
}
