import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import "./style/LoginSignUp.css";
import logo from "./artwork/splitsy_logo_v7.png";

export default function LoginSignUp() {
  return (
    <div>
      <div className="container-logo">
        <div>
          <img className="logo" src={logo}></img>
        </div>
        <h3 className="title">Event Finance Organization</h3>
      </div>
      <div className="container-login-signup">
        <Login />
        <SignUp />
      </div>
    </div>
  );
}
