import React, { Component } from "react";
import EventName from "./EventName";
import GatherReceipts from "./GatherReceipts";
import Breakdown from "./Breakdown";

class Main extends Component {
  state = {
    step: 1,
    title: "",
    participants: [],
    receiptDetails: [],
  };

  render() {
    if (this.state.step === 1) {
      console.log("App.js Step 1: ", this.state);
      return (
        <div>
          <div>
            <h1 style={{ textAlign: "center" }}>Event Finance Organization</h1>
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

export default Main;
