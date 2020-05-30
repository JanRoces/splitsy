import React, { Component } from "react";
import EventName from "./components/EventName";
import GatherReceipts from "./components/GatherReceipts";
import ShowReceiptData from "./components/ShowReceiptData";

class App extends Component {
  state = {
    step: 1,
    title: "",
    participants: [],
    receiptDetails: [],
  };

  handleOnSubmit = (values) => {
    var s = this.state.step;
    s++;

    this.setState({
      step: s,
      title: values.title,
      participants: values.participants,
    });
  };

  render() {
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
            />
          </div>
        </div>
      );
    } else if (this.state.step === 3) {
      return (
        <div>
          <ShowReceiptData />
        </div>
      );
    } else {
      return <div>Step Error</div>;
    }
  }
}

export default App;
