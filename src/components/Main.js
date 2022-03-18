import React, { Component } from "react";
import CreateEvent from "./CreateEvent";
import ReceiptInput from "./ReceiptInput";
import Breakdown from "./Breakdown";
import { buildMatrix, findPaidForReceipts } from "./MatrixBuilder";
import { buildChartData } from "./ChartBuilder";
import "../styles/Main.css";

class Main extends Component {
  state = {
    step: 1,
    title: "",
    participants: [],
    customAmounts: [],
    receipts: [],
    matrix: [],
    paidForArray: [],
    chartData: {},
    eventTotal: "",
  };

  calculateTotal = (receipts) => {
    const len = receipts.length;
    var eventTotal = 0;

    for (var i = 0; i < len; i++) {
      eventTotal = eventTotal += +receipts[i].total;
    }

    return eventTotal;
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
    const receipts = e.receipts;
    var { matrix, participants } = this.state;
    var { step } = this.state;
    var paidForArray = [];
    var chartData = [];
    var eventTotal;

    matrix = buildMatrix(receipts, participants);
    paidForArray = findPaidForReceipts(receipts, participants);
    chartData = buildChartData(receipts, participants);
    eventTotal = this.calculateTotal(receipts);

    step++;

    this.setState({
      step: step,
      receips: e.receipts,
      matrix: matrix,
      paidForArray: paidForArray,
      chartData: chartData,
      eventTotal: eventTotal,
    });
  };

  render() {
    const { step, title } = this.state;
    switch (step) {
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
            <h2 className="title">{title} Finance Organization</h2>
            <ReceiptInput
              participants={this.state.participants}
              customAmounts={this.state.customAmounts}
              details={this.state.receiptDetails}
              onSubmit={this.setReceiptsAndBuildMatrix}
            />
          </div>
        );
      case 3:
        return (
          <div>
            <div>
              <h2 className="title">{title} Finance Breakdown</h2>
            </div>
            <Breakdown
              matrix={this.state.matrix}
              paidFor={this.state.paidForArray}
              chartData={this.state.chartData}
              participants={this.state.participants}
              eventTotal={this.state.eventTotal}
            />
          </div>
        );
      default:
        return <div>u don goof'd</div>;
    }
  }
}

export default Main;
