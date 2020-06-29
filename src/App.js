import React, { Component } from "react";
import EventName from "./components/EventName";
import GatherReceipts from "./components/GatherReceipts";
import Breakdown from "./components/Breakdown";
import "./App.css";

class App extends Component {
  state = {
    step: 1,
    title: "",
    participants: [],
    receiptDetails: [],
  };

  // state = {
  //   step: 3,
  //   title: "Las Vegas",
  //   participants: ["A", "B", "C", "D"],
  //   receiptDetails: [
  //     {
  //       name: "Car Rental",
  //       amount: 400,
  //       payer: "A",
  //       evenSplit: 100,
  //       custom: [],
  //     },
  //     {
  //       name: "Air Bnb",
  //       amount: 200,
  //       payer: "B",
  //       evenSplit: 50,
  //       custom: [],
  //     },
  //     {
  //       name: "Bar",
  //       amount: 40,
  //       payer: "C",
  //       evenSplit: 10,
  //       custom: [],
  //     },
  //     {
  //       name: "Gas",
  //       amount: 32,
  //       payer: "D",
  //       evenSplit: 8,
  //       custom: [],
  //     },
  //     {
  //       name: "Food",
  //       amount: 50,
  //       payer: "B",
  //       evenSplit: 0,
  //       custom: [10, 20, 5, 15],
  //     },
  //   ],
  // };

  render() {
    //console.clear();
    if (this.state.step === 1) {
      console.log("App.js Step 1: ", this.state);
      return (
        <div>
          <div>
            <img
              className="main-logo"
              src={process.env.PUBLIC_URL + "/splitsy_full_logo.png"}
              alt="logo"
            />
          </div>
          <div>
            <h2 style={{ textAlign: "center" }}>Event Finance Organization</h2>
          </div>
          <br />
          <div>
            <EventName
              onSubmit={this.handleOnSubmit}
              // getMembers={this.retrieveMembers}
            />
          </div>
        </div>
      );
    } else if (this.state.step === 2) {
      console.log("App.js Step 2: ", this.state);
      return (
        <div>
          <br />
          <div>
            <h2 style={{ textAlign: "center" }}>
              {this.state.title} Finance Organization
            </h2>
          </div>
          <br />
          <div>
            <GatherReceipts
              members={this.state.participants}
              onSubmit={this.handleOnSubmit}
              toParent={this.getDetails}
              title={this.state.title}
            />
          </div>
        </div>
      );
    } else if (this.state.step === 3) {
      console.log("App.js Step 3: ", this.state);
      return (
        <div>
          <br />
          breakdown step
          <div>
            <h2 style={{ textAlign: "center" }}>
              {this.state.title} Finance Breakdown
            </h2>
          </div>
          <div>
            <Breakdown
              allReceipts={this.state.receiptDetails}
              members={this.state.participants}
            />
          </div>
        </div>
      );
    } else {
      return <div>Step Error</div>;
    }
  }

  handleOnSubmit = (values) => {
    var s = this.state.step;
    s++;

    this.setState({
      step: s,
      title: values.title,
      participants: values.participants,
    });
  };

  getDetails = (details) => {
    console.log("App-getDetails(): ", details);
    var tmp = this.state.receiptDetails.concat(details);
    this.setState({ receiptDetails: tmp });
    console.log("state.receiptDetails: ", this.state.receiptDetails);
  };
}

export default App;
