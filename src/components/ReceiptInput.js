import React, { Component } from "react";
import ReactDOM from "react-dom";
import AmountOwed from "./AmountOwed";
import "./Display.css";

const icon = "camera icon";

var receiptDetails = {
  name: "",
  amount: 0,
  payer: "",
  evenSplit: 0,
  custom: [],
};

class ReceiptInput extends Component {
  state = {
    details: [],
    receiptname: "",
    runningAmount: 0,
    even: false,
    custom: false,
  };

  makeOption = function (x) {
    return <option key={x}>{x}</option>;
  };

  splitEven = () => {
    receiptDetails.custom = [];
    var n = receiptDetails.amount;
    var m = n / this.props.members.length;
    var num = m.toFixed(2);
    receiptDetails.evenSplit = num;
    console.log("receiptDetails.evenSplit: ", receiptDetails.evenSplit);
    this.setState({ even: true, custom: false });
  };

  splitCustom = () => {
    receiptDetails.evenSplit = 0;
    this.setState({ runningAmount: 0, even: false, custom: true });
  };

  setName = (name) => {
    receiptDetails.name = name;
    console.log("receiptDetails.name: ", receiptDetails.name);
  };

  setAmount = (amount) => {
    receiptDetails.amount = amount;
    console.log("receiptDetails.amount: ", receiptDetails.amount);
    this.setState({ runningAmount: amount });
  };

  setPayer = () => {
    var selected = ReactDOM.findDOMNode(this.refs.selector).value;
    receiptDetails.payer = selected;
    console.log("receiptDetails.payer: ", receiptDetails.payer);
  };

  render() {
    return (
      <div>
        <div className="add-receipt-form">
          <div>
            <i className={`${icon} icon`}></i>
            <input
              type="text"
              placeholder="Receipt Name"
              onChange={(e) => this.setName(e.target.value)}></input>
            $
            <input
              className="amount-form"
              type="number"
              placeholder="0.00"
              min="0.00"
              step="0.01"
              onChange={(e) => this.setAmount(e.target.value)}></input>
            <label>Paid By:</label>
            <select ref="selector" onChange={this.setPayer}>
              <option>-- select option --</option>
              {this.props.members.map(this.makeOption)}
            </select>
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
                amt={this.state.runningAmount}
              />
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default ReceiptInput;
