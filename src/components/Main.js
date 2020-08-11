import React, { Component } from "react";
import EventName from "./EventName";
import GatherReceipts from "./GatherReceipts";
import ReceiptInput from "./ReceiptInput";
import Breakdown from "./Breakdown";
import ReceiptList from "./ReceiptList";
import "./Main.css";

class Main extends Component {
  // state = {
  //   step: 1,
  //   title: "",
  //   participants: [],
  //   receiptDetails: [],
  // };

  //TEST DATA

  //step 2 testing
  state = {
    step: 2,
    title: "Test",
    participants: ["A", "B", "C", "D"],
    receiptDetails: [],
    count: 0,
  };

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
  // };

  render() {
    if (this.state.step === 1) {
      console.log("Main.js Step 1: ", this.state);
      return (
        <div>
          <div>
            <h1 style={{ textAlign: "center" }}>Event Finance Organization</h1>
          </div>
          <br />
          <div>
            <EventName onSubmit={this.handleOnSubmit} />
          </div>
        </div>
      );
    } else if (this.state.step === 2) {
      console.log("Main.js Step 2: ", this.state);
      console.log("state.receiptDetails: ", this.state.receiptDetails);
      return (
        <div>
          <br />
          <div>
            <h2 style={{ textAlign: "center" }}>
              {this.state.title} Finance Organization
            </h2>
          </div>
          <br />

          <ReceiptInput
            members={this.state.participants}
            details={this.state.receiptDetails}
            onMainReturn={this.getDetails}
          />

          <br />
          <div className="inline fields">
            <button className="ui primary button" onClick={this.handleOnSubmit}>
              Submit
            </button>
          </div>

          {/*
          <div>
            <ReceiptList details={this.state.receiptDetails} />
          </div>
          */}

          {/*
          <div>
            <GatherReceipts
              members={this.state.participants}
              //onSubmit={this.handleOnSubmit}
              //toParent={this.getDetails}
              title={this.state.title}
            />
          </div>
          */}
        </div>
      );
    } else if (this.state.step === 3) {
      console.log("Main.js Step 3: ", this.state);
      return (
        <div>
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
      console.log(this.state);
      return <div>Step Error</div>;
    }
  }

  handleOnSubmit = (values) => {
    var s = this.state.step;
    s++;

    this.setState({ step: s });
  };

  getDetails = (details) => {
    console.log("getDetails() values: ", details);
    var d = this.state.receiptDetails;
    d.push(details);
    this.setState({ receiptDetails: d });
  };
}

export default Main;
