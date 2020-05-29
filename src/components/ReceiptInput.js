import React, { Component } from "react";
import AmountOwed from "./AmountOwed";
import "./Display.css";

const icon = "camera icon";

class ReceiptInput extends Component {
  state = { receiptname: "", receiptAmount: 0, even: false, custom: false };

  makeOption = function (x) {
    return <option key={x}>{x}</option>;
  };

  splitEven = () => {
    // let amt = this.state.amount;
    // let num = amt / dummyData.length;
    // let n = num.toFixed(2);
    // this.setState({ evenSplit: n });
    this.setState({ even: true, custom: false });
  };

  splitCustom = (value) => {
    // var tmp = this.state.customSplit.concat(value);
    // this.setState({ customSplit: tmp });
    this.setState({ even: false, custom: true });
  };

  render() {
    return (
      <div>
        <form className="add-receipt-form" onSubmit={this.handleOnSubmit}>
          <div>
            {/* <i className={`${icon} icon`}></i> */}
            <input
              type="text"
              placeholder="Receipt Name"
              onChange={(e) =>
                this.setState({ receiptName: e.target.value })
              }></input>
            $
            <input
              className="amount-form"
              type="number"
              placeholder="0.00"
              min="0.00"
              step="0.01"
              onChange={(e) =>
                this.setState({ receiptAmount: e.target.value })
              }></input>
            <label>Paid By:</label>
            {/*<select>{this.props.members.map(makeOption)}</select>*/}
            {<select>{this.props.members.map(this.makeOption)}</select>}
            <button type="button" onClick={this.splitEven}>
              split even
            </button>
            <button type="button" onClick={this.splitCustom}>
              custom
            </button>
            <div>
              <AmountOwed
                dispEven={this.state.even}
                dispCust={this.state.custom}
                members={this.props.members}
                amt={this.state.receiptAmount}
                name={this.state.receiptName}
              />
            </div>
          </div>
        </form>
        <br />
      </div>
    );
  }
}

export default ReceiptInput;
