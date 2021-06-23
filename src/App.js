import React, { Component } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./components/Main";
import LoginSignUp from "./components/LoginSignUp";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/login-signup" component={LoginSignUp} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <PrivateRoute exact path="/" component={Main} />
          </Switch>
        </AuthProvider>
      </Router>
    );
  }
}

export default App;
