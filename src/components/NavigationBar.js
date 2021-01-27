import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import logo from "./artwork/splitsy_logo_small_white.png";
import "./style/NavigationBar.css";

export default function NavigationBar() {
  const history = useHistory();
  const { logout } = useAuth();

  return (
    <div className="navigation-bar">
      <div className="small-logo-container">
        <img className="small-logo" alt="logo" src={logo}></img>
      </div>
      <div className="nav-link">
        <button className="sign-out-button" onClick={handleLogOut}>
          Sign Out
        </button>
      </div>
    </div>
  );

  async function handleLogOut() {
    try {
      await logout();
      history.pushState("/login-signup");
    } catch {}
  }
}
