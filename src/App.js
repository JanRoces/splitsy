import React, { Component } from "react";
import Main from "./components/Main";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext"

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Main />
      </AuthProvider>
    );
  }
}

export default App;
