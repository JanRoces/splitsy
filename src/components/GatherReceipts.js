import React, { Component } from "react";
//import AmountOwed from "./AmountOwed";
import ReceiptInput from "./ReceiptInput";
import "./Display.css";

const dummyData = ["Jan", "Jeff", "Jorge", "Kyle"];

class GatherReceipts extends Component {
  state = { receiptsIndex: ["receipt-0"] };

  // handleOnSubmit = (e) => {
  //   const { onSubmit } = this.props;
  //   if (this.state.title !== "" && this.state.participants !== []) {
  //     e.preventDefault();

  //     onSubmit(this.state);
  //   }
  // };

  appendForm = () => {
    console.log("'+ New Receipt' was clicked");
    var newReceipt = `input-${this.state.receiptsIndex.length}`;
    this.setState((prevState) => ({
      receiptsIndex: prevState.receiptsIndex.concat([newReceipt]),
    }));
  };

  render() {
    return (
      <div className="gather-receipts">
        <form onSubmit={this.handleOnSubmit}>
          <div>
            {this.state.receiptsIndex.map((receiptsIndex) => (
              // <ReceiptInput key={receiptsIndex} members={dummyData} />
              <ReceiptInput key={receiptsIndex} members={this.props.members} />
            ))}
          </div>
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
