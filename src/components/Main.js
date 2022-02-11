import React, { Component } from "react";
import CreateEvent from "./CreateEvent";
import ReceiptInput from "./ReceiptInput";
import Breakdown from "./Breakdown";
import "../styles/Main.css";

class Main extends Component {
  state = {
    step: 1,
    title: "",
    participants: [],
    receiptDetails: [],
  };

  setEventNameAndParticipants = (e) => {
    var s = this.state.step;
    s++;
    this.setState({ step: s, title: e.title, participants: e.participants });
  };

  receiptInputSubmit = (e) => {
    var s = this.state.step;
    s++;
    this.setState({ step: s, receiptDetails: e.receipts });
  };

  getDetails = (details) => {
    this.setState({ receiptDetails: details });
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
          </div>
        );
      case 2:
        return (
          <div>
            <div>
              <h2 className="title">{this.state.title} Finance Organization</h2>
            </div>
            <ReceiptInput
              members={this.state.participants}
              details={this.state.receiptDetails}
              onMainReturn={this.getDetails}
              onSubmit={this.receiptInputSubmit}
            />
            <br />
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
            <div>
              <Breakdown
                allReceipts={this.state.receiptDetails}
                members={this.state.participants}
              />
            </div>
          </div>
        );
      default:
        console.log(this.state);
        return <div>u don goof'd</div>;
    }
  }
}

export default Main;
