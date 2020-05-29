import React, { Component } from "react";
import EventName from "./components/EventName";
import GatherReceipts from "./components/GatherReceipts";
import ShowReceiptData from "./components/ShowReceiptData";

class App extends Component {
  state = { step: 1, title: "", participants: [] };

  handleOnSubmit = (values) => {
    //console.log("values: ", v);
    console.log("title: ", values.title);
    console.log("participants: ", values.participants);
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
