import React from "react";
import logo from "./artwork/splitsy_logo_small";

export default function NavigationBar() {
  return (
    <div className="navigation-bar">
      <ul>
        <li>
          <img className="small-logo" alt="logo" src={logo}></img>
        </li>
      </ul>
    </div>
  );
}
