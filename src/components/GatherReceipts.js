import React, { Component } from "react";
//import AmountOwed from "./AmountOwed";
import ReceiptInput from "./ReceiptInput";
import "./Display.css";

const dummyData = ["Jan", "Jeff", "Jorge", "Kyle"];

class GatherReceipts extends Component {
  state = {
    title: this.props.title,
    participants: this.props.members,
    receiptsIndex: ["receipt-0"],
  };

  //tmp = [];

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

  getDetails = (details) => {
    console.log("GatherReceipts-getDetails(): ", details);
    this.props.toParent(details);
  };

  //members={this.props.members}
  render() {
    console.log("Gather Receipts state.title: ", this.state.title);
    return (
      <div className="gather-receipts">
        <form onSubmit={this.handleOnSubmit}>
          <div>
            {this.state.receiptsIndex.map((receiptsIndex) => (
              <ReceiptInput
                onReturn={this.handleOnSubmit}
                key={receiptsIndex}
                members={this.props.members}
                onGatherReceiptsReturn={this.getDetails}
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
