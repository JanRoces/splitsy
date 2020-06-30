import React, { Component } from "react";
import Main from "./components/Main";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <div className="logo-container">
          <img
            className="logo-main"
            src={process.env.PUBLIC_URL + "/splitsy_logo_v7.png"}
            alt="logo"
          />
        </div>
        <Main />
      </div>
    );
  }
}

export default App;
