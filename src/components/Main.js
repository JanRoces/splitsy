import React, { Component } from "react";
import CreateEvent from "./CreateEvent";
import ReceiptInput from "./ReceiptInput";
import Breakdown from "./Breakdown";
import "../styles/Main.css";

class Main extends Component {
  // state = {
  //   step: 1,
  //   title: "",
  //   participants: [],
  //   customAmounts: [],
  //   receipts: [],
  // };

  state = {
    step: 2,
    title: "Test",
    participants: ["Jan", "Brenda", "Gayle"],
    customAmounts: ["", "", ""],
    receipts: [],
  };

  setEventNameAndParticipants = (e) => {
    const customAmounts = [];
    const len = e.participants.length;
    var s = this.state.step;

    for (var i = 0; i < len; i++) {
      customAmounts.push("");
    }

    s++;
    this.setState({
      step: s,
      title: e.title,
      participants: e.participants,
      customAmounts: customAmounts,
    });
  };

  setReceipts = (e) => {
    var s = this.state.step;
    s++;
    this.setState({ step: s, receips: e.receipts });
  };

  render() {
    switch (this.state.step) {
      case 1:
        return (
          <div>
            <h2 className="title">Event Finance Organization</h2>
            <div>
              <CreateEvent onSubmit={this.setEventNameAndParticipants} />
            </div>
            <div>
              <button onClick={this.nextStep}>STEP</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="title">{this.state.title} Finance Organization</h2>
            <ReceiptInput
              participants={this.state.participants}
              customAmounts={this.state.customAmounts}
              details={this.state.receiptDetails}
              onSubmit={this.setReceipts}
            />
            <br />
            <div>
              <button onClick={this.backStep}>STEP</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <div>
              <h2 style={{ textAlign: "center" }}>
                {this.state.title} Finance Breakdown
              </h2>
            </div>
            <div>Render Breakdown</div>
          </div>
        );
      default:
        console.log(this.state);
        return <div>u don goof'd</div>;
    }
  }

  //temp methods
  nextStep = () => {
    this.setState({ step: 2 });
  };

  backStep = () => {
    this.setState({ step: 1 });
  };
}

export default Main;
