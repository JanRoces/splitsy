import React, { Component, useState } from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
//import Login from "./LoginV1";
import "./style/Main.css";
// import EventName from "./EventName";
// import ReceiptInput from "./ReceiptInput";
// import Breakdown from "./Breakdown";

//import logo from "./artwork/splitsy_logo_v7.png";

export default function Main() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogOut() {
    setError("");

    try {
      await logout();
      history.pushState("/login-signup");
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <div>
      <h3>Email: {currentUser.email}</h3>
      <button variant="link" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
}

// state = {
//   step: 1,
//   title: "",
//   participants: [],
//   receiptDetails: [],
// };

//TEST DATA

//step 2 testing
// state = {
//   step: 2,
//   title: "Test",
//   participants: ["A", "B", "C", "D"],
//   receiptDetails: [],
//   count: 0,
// };

//step 3 testing
// state = {
//   step: 3,
//   title: "Test",
//   participants: ["A", "B", "C", "D"],
//   receiptDetails: [
//     {
//       name: "Air Bnb",
//       amount: 200,
//       payer: "A",
//       evenSplit: 33.33,
//       custom: [],
//     },

//     {
//       name: "Car Rental",
//       amount: 350,
//       payer: "B",
//       evenSplit: 116.66,
//       custom: [],
//     },

//     {
//       name: "Uber/Lyft",
//       amount: 75.5,
//       payer: "C",
//       evenSplit: 25.16,
//       custom: [],
//     },

//     {
//       name: "Tickets",
//       amount: 120,
//       payer: "A",
//       evenSplit: 40,
//       custom: [],
//     },
//   ],
//};

// if (this.state.step === 1) {
//   console.log("Main.js Step 1: ", this.state);
//   return (
//     <div>
//       <div>
//         <h1 style={{ textAlign: "center" }}>Event Finance Organization</h1>
//       </div>
//       <br />
//       <div>
//         <EventName onSubmit={this.eventNameSubmit} />
//       </div>
//     </div>
//   );
// } else if (this.state.step === 2) {
//   console.log("Main.js Step 2: ", this.state);
//   return (
//     <div>
//       <br />
//       <div>
//         <h2 style={{ textAlign: "center" }}>
//           {this.state.title} Finance Organization
//         </h2>
//       </div>
//       <br />
//       <ReceiptInput
//         members={this.state.participants}
//         details={this.state.receiptDetails}
//         onMainReturn={this.getDetails}
//         onSubmit={this.receiptInputSubmit}
//       />
//       <br />
//     </div>
//   );
// } else if (this.state.step === 3) {
//   console.log("Main.js Step 3: ", this.state);
//   return (
//     <div>
//       <div>
//         <h2 style={{ textAlign: "center" }}>
//           {this.state.title} Finance Breakdown
//         </h2>
//       </div>
//       <div>
//         <Breakdown
//           allReceipts={this.state.receiptDetails}
//           members={this.state.participants}
//         />
//       </div>
//     </div>
//   );
// } else {
//   console.log(this.state);
//   return <div>Step Error</div>;
// }

// eventNameSubmit = (e) => {
//   var s = this.state.step;
//   s++;
//   this.setState({ step: s, title: e.title, participants: e.participants });
// };

// receiptInputSubmit = (e) => {
//   var s = this.state.step;
//   s++;
//   this.setState({ step: s, receiptDetails: e.receipts });
// };

// getDetails = (details) => {
//   this.setState({ receiptDetails: details });
// };

//export default Main;
