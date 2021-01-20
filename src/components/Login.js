import React, { Component } from "react";
import "./style/Login.css";
import logo from "./artwork/splitsy_logo_v7.png";

class Login extends Component {
    render (){
        return (
            <div>
              <div className="logo-container">
                <img className="logo" src={logo}></img>
                <h3>Event Finance Organization</h3>
              </div>
              <div className="login-signup-container">
                <div className="login-container">
                  <h2 style={{color: "#455486"}}>Log In</h2>
                  <input className="login-input" placeholder="User Name"></input>
                  <input className="login-input" placeholder="Password"></input>
                  <button className="login-button">Sign In</button>
                </div>
                <div className="signup-container">
                  <h2>Sign Up</h2>
                  <input required className="login-input" placeholder="Create User Name"></input>
                  <input required className="login-input" placeholder="Password (Atleast 6 Characters)" type="password" minLength="6"></input>
                  <input required className="login-input" placeholder="Confirm Password" type="password" minLength="6"></input>
                  <button className="signup-button">Sign Up</button>
                </div>
              </div>
            </div>
          );
    }
}

export default Login;