import React, { Component } from "react";
//import AmountOwed from "./AmountOwed";
import ReceiptInput from "./ReceiptInput";
import "./Display.css";

const dummyData = ["Jan", "Jeff", "Jorge", "Kyle"];

var receiptDetails = {
  name: "",
  amount: 0,
  payer: "",
  evenSplit: 0,
  custom: [],
};

class GatherReceipts extends Component {
  state = { receiptsIndex: ["receipt-0"] };

  handleOnSubmit = (e) => {
    const { onSubmit } = this.props;

    e.preventDefault();

    onSubmit(this.state);
  };

  appendForm = () => {
    console.log("+ New Receipt was clicked");
    var newReceipt = `receipt-${this.state.receiptsIndex.length}`;
    this.setState((prevState) => ({
      receiptsIndex: prevState.receiptsIndex.concat([newReceipt]),
    }));
    console.log(this.state);
  };

  render() {
    return (
      <div className="gather-receipts">
        <form onSubmit={this.handleOnSubmit}>
          <div>
            {this.state.receiptsIndex.map((receiptsIndex) => (
              <ReceiptInput
                onReturn={this.handleOnSubmit}
                key={receiptsIndex}
                members={this.props.members}
              />
              // <ReceiptInput key={receiptsIndex} members={this.props.members} />
            ))}
          </div>
          <br />
          <div>
            <button type="button" onClick={this.appendForm}>
              + New Receipt
            </button>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default GatherReceipts;
