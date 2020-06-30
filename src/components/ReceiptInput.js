import React, { Component } from "react";
import ReactDOM from "react-dom";
import AmountOwed from "./AmountOwed";
import "./ReceiptInput.css";
import "./Display.css";

const icon = "camera icon";

class ReceiptInput extends Component {
  state = {
    details: [],
    receiptname: "",
    runningAmount: 0,
    even: false,
    custom: false,
  };

  receiptDetails = {
    name: "",
    amount: 0,
    payer: "",
    evenSplit: 0,
    custom: [],
  };

  render() {
    return (
      <div>
        <div className="fields">
          <div className="six wide field">
            <label>Receipt Name</label>
            <input
              type="text"
              placeholder="Receipt Name"
              onChange={(e) => this.setName(e.target.value)}></input>
          </div>
          <div className="three wide field">
            <label>Amount</label>
            <input
              className="amount-form"
              type="number"
              placeholder="0.00"
              min="0.00"
              step="0.01"
              onChange={(e) => this.setAmount(e.target.value)}></input>
          </div>
          <div className="four wide field">
            <label>Paid By:</label>
            <select ref="selector" onChange={this.setPayer}>
              <option>select option</option>
              {this.props.members.map(this.makeOption)}
            </select>
          </div>
          <div className="two wide field">
            <button
              className="ui button"
              type="button"
              onClick={this.splitEven}>
              split even
            </button>
          </div>
          <div className="two wide field">
            <button
              className="ui button"
              type="button"
              onClick={this.splitCustom}>
              custom split
            </button>
          </div>
        </div>

        <div>
          <AmountOwed
            dispEven={this.state.even}
            dispCust={this.state.custom}
            members={this.props.members}
            amt={this.state.runningAmount}
            onReceiptInputReturn={this.getCustomVals}
          />
        </div>

        <button
          className="ui button"
          type="button"
          ref="pushReceipt"
          onClick={this.pushReceipt}>
          done
        </button>

        <br />
      </div>
    );
  }

  makeOption = function (x) {
    return <option key={x}>{x}</option>;
  };

  splitEven = () => {
    this.receiptDetails.custom = [];
    var n = this.receiptDetails.amount;
    var m = n / this.props.members.length;
    var num = m.toFixed(2);
    var fNum = parseFloat(num);
    this.receiptDetails.evenSplit = fNum;
    console.log("receiptDetails.evenSplit: ", this.receiptDetails.evenSplit);
    this.setState({ even: true, custom: false });
  };

  splitCustom = () => {
    this.receiptDetails.evenSplit = 0;
    this.setState({ even: false, custom: true });
  };

  setName = (name) => {
    this.receiptDetails.name = name;
    console.log("receiptDetails.name: ", this.receiptDetails.name);
  };

  setAmount = (amount) => {
    this.receiptDetails.amount = parseFloat(amount);
    console.log("receiptDetails.amount: ", this.receiptDetails.amount);
    this.setState({ runningAmount: amount });
  };

  setPayer = () => {
    var selected = ReactDOM.findDOMNode(this.refs.selector).value;
    this.receiptDetails.payer = selected;
    console.log("receiptDetails.payer: ", this.receiptDetails.payer);
  };

  getCustomVals = (vals) => {
    this.receiptDetails.custom = this.receiptDetails.custom.splice(
      0,
      vals.length,
      ...vals
    );

    this.receiptDetails.custom = vals;
    console.log("onReturn customVals: ", this.receiptDetails.custom);
  };

  pushReceipt = () => {
    console.log("ReceiptInput-pushReceipt(): ", this.receiptDetails);
    this.props.onGatherReceiptsReturn(this.receiptDetails);
  };
}

export default ReceiptInput;
