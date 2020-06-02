import React, { Component } from "react";
import EventName from "./components/EventName";
import GatherReceipts from "./components/GatherReceipts";
import Breakdown from "./components/Breakdown";

class App extends Component {
  state = {
    step: 1,
    title: "",
    participants: [],
    receiptDetails: [],
  };

  //test data
  // state = {
  //   step: 3,
  //   title: "The Boyz",
  //   participants: ["Jan", "Jeff", "Jorge", "Kyle", "Myles"],
  //   receiptDetails: [
  //     {
  //       name: "Air Bnb",
  //       amount: 565.9,
  //       payer: "Jan",
  //       evenSplit: 113.18,
  //       custom: [],
  //     },
  //     {
  //       name: "Car Rental",
  //       amount: 352.75,
  //       payer: "Jeff",
  //       evenSplit: 70.55,
  //       custom: [],
  //     },
  //     {
  //       name: "Bar",
  //       amount: 81,
  //       payer: "Jorge",
  //       evenSplit: 0,
  //       custom: [14, 17, 20, 17, 13],
  //     },
  //     {
  //       name: "Gas",
  //       amount: 14.6,
  //       payer: "Kyle",
  //       evenSplit: 2.92,
  //       custom: [],
  //     },
  //     {
  //       name: "Food",
  //       amount: 205.56,
  //       payer: "Jan",
  //       evenSplit: 0,
  //       custom: [52.13, 31.24, 45.45, 36.7, 40.04],
  //     },
  //   ],
  // };

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

  render() {
    //console.clear();
    if (this.state.step === 1) {
      console.log("App.js Step 1: ", this.state);
      return (
        <div>
          <div>logo placement</div>
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
}

export default App;
