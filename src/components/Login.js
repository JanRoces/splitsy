import React, { Component } from "react";
import "./style/Login.css";
import logo from "./artwork/splitsy_logo_v7.png";

class Login extends Component {
    render (){
        return (
            <div>
              <div className="logo-container">
                <img className="logo" alt="logo" src={logo}></img>
                <h3>Event Finance Organization</h3>
              </div>
              <div className="login-signup-container">
                <div className="login-container">
                  <form >
                    <h2 style={{color: "#455486"}}>Log In</h2>
                    <input required className="login-input" placeholder="Email"></input>
                    <input required className="login-input" placeholder="Password" type="password"></input>
                    <button className="login-button" onClick={this.checkLogin}>Sign In</button>
                  </form>
                  <button className="login-button" onClick={this.skipLogin}>Skip</button>
                </div>
                <div className="signup-container">
                  <form>
                    <h2>Sign Up</h2>
                    <input required className="login-input" placeholder="Email"></input>
                    <input required className="login-input" placeholder="Password (Atleast 6 Characters)" type="password" minLength="6"></input>
                    <input required className="login-input" placeholder="Confirm Password" type="password" minLength="6"></input>
                    <button className="signup-button" onClick={this.checkSignup}>Sign Up</button>
                  </form>
                </div>
            </div>
          </div>
          );
    }

    checkLogin = () => {
        console.log("login clicked");
    }

    checkSignup = () => {
        console.log("signup clicked");
    }

    skipLogin = () => {
        console.log("skip clicked");
    }
}

export default Login;