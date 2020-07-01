import React, { Component } from "react";
import ReceiptInput from "./ReceiptInput";

class GatherReceipts extends Component {
  state = {
    title: this.props.title,
    participants: this.props.members,
    receiptsIndex: ["receipt-0"],
  };

  render() {
    return (
      <div>
        <form className="ui form" onSubmit={this.handleOnSubmit}>
          <div>
            {this.state.receiptsIndex.map((receiptsIndex) => (
              <ReceiptInput
                onReturn={this.handleOnSubmit}
                key={receiptsIndex}
                members={this.props.members}
                onGatherReceiptsReturn={this.getDetails}
              />
            ))}
          </div>
          <br />
          <div className="inline fields">
            <button
              className="ui button"
              type="button"
              onClick={this.appendForm}>
              + New Receipt
            </button>
            <button className="ui submit button">Submit</button>
          </div>
        </form>
      </div>
    );
  }

  handleOnSubmit = (e) => {
    const { onSubmit } = this.props;

    e.preventDefault();

    onSubmit(this.state);
  };

  appendForm = () => {
    var newReceipt = `receipt-${this.state.receiptsIndex.length}`;
    this.setState((prevState) => ({
      receiptsIndex: prevState.receiptsIndex.concat([newReceipt]),
    }));
    console.log(this.state);
  };

  getDetails = (details) => {
    this.props.toParent(details);
  };
}

export default GatherReceipts;
