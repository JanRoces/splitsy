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
  state = { receiptname: "", receiptAmount: 0, even: false, custom: false };

  //   returnToParent = () => {
  //     console.log(this.state);
  //     this.props.onReturn(this.state);
  //   };

  makeOption = function (x) {
    return <option key={x}>{x}</option>;
  };

  splitEven = () => {
    this.setState({ even: true, custom: false });
  };

  splitCustom = (value) => {
    this.setState({ even: false, custom: true });
  };

  setName = (name) => {
    receiptDetails.name = name;
    console.log("receiptDetails.name ", receiptDetails.name);
  };

  setAmount = (amount) => {
    receiptDetails.amount = amount;
    console.log("receiptDetails.amount ", receiptDetails.amount);
  };

  setPayer = () => {
    var selected = ReactDOM.findDOMNode(this.refs.selector).value;
    receiptDetails.payer = selected;
    console.log("receiptDetails.payer ", receiptDetails.payer);
  };

  //   componentDidMount() {
  //     var selected = ReactDOM.findDOMNode(this.refs.selector).value;
  //     this.setPayer(selected);
  //   }

  render() {
    return (
      <div>
        <div className="add-receipt-form">
          <div>
            {/* <i className={`${icon} icon`}></i> */}
            <input
              type="text"
              placeholder="Receipt Name"
              onChange={(e) => this.setName(e.target.value)}
              //   onChange={(e) =>
              //     this.setState({ receiptName: e.target.value })
              //   }
            ></input>
            $
            <input
              className="amount-form"
              type="number"
              placeholder="0.00"
              min="0.00"
              step="0.01"
              onChange={(e) => this.setAmount(e.target.value)}
              //   onChange={(e) =>
              //     this.setState({ receiptAmount: e.target.value })}
            ></input>
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
                amt={receiptDetails.amount}
                name={this.state.receiptName}
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
