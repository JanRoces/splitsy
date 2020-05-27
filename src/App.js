import React, { Component } from "react";
import EventName from "./componenets/EventName";
import GatherReceipts from "./componenets/GatherReceipts";

class App extends Component {
  state = { step: 2, title: "", participants: [] };

  handleOnSubmit = (values) => {
    //console.log("values: ", v);
    console.log("title: ", values.title);
    console.log("participants: ", values.participants);
    this.setState({
      step: 2,
      title: values.title,
      participants: values.participants,
    });
  };

  render() {
    if (this.state.step === 1) {
      return (
        <div>
          <div>logo placement</div>
          <div>
            <h2 style={{ textAlign: "center" }}>Event Finance Organization</h2>
          </div>
          <br />
          <div>
            <EventName onSubmit={this.handleOnSubmit} />
          </div>
        </div>
      );
    } else if (this.state.step === 2) {
      return (
        <div>
          <div>
            <h2 style={{ textAlign: "center" }}>
              {this.state.title} Finance Organization
            </h2>
          </div>
          <div>
            <h4 style={{ textAlign: "center" }}>Add Receipts</h4>
          </div>
          <div>
            <GatherReceipts members={this.state.participants} />
          </div>
        </div>
      );
    } else {
      return <div>Step Error</div>;
    }
  }
}

export default App;
