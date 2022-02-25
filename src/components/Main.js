import React, { Component } from "react";
import CreateEvent from "./CreateEvent";
import ReceiptInput from "./ReceiptInput";
import Breakdown from "./Breakdown";
import { buildMatrix } from "./MatrixBuilder";
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

    matrix: [],
  };

  setEventNameAndParticipants = (e) => {
    const customAmounts = [];
    const len = e.participants.length;
    var { step } = this.state;

    for (var i = 0; i < len; i++) {
      customAmounts.push("");
    }

    step++;
    this.setState({
      step: step,
      title: e.title,
      participants: e.participants,
      customAmounts: customAmounts,
    });
  };

  setReceiptsAndBuildMatrix = (e) => {
    var { matrix, participants } = this.state;
    var { step } = this.state;

    matrix = buildMatrix(e.receipts, participants);
    console.log("matrix :>> ", matrix);
    step++;
    this.setState({ step: step, receips: e.receipts, matrix: matrix });
  };

  render() {
    // console.log("this.state :>> ", this.state);
    const { step, title } = this.state;
    switch (step) {
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
            <h2 className="title">{title} Finance Organization</h2>
            <ReceiptInput
              participants={this.state.participants}
              customAmounts={this.state.customAmounts}
              details={this.state.receiptDetails}
              onSubmit={this.setReceiptsAndBuildMatrix}
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
              <h2 className="title">{title} Finance Breakdown</h2>
            </div>
            <Breakdown />
            <br />
            <div>
              <button onClick={this.nextStep}>STEP</button>
            </div>
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
