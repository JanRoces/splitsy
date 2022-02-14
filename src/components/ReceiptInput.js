import React, { Component } from "react";
import AmountOwed from "./AmountOwed";
import "./ReceiptInput.css";

class ReceiptInput extends Component {
  state = {
    details: {
      id: 0,
      name: "",
      amount: 0,
      paidBy: this.props.participants[0],
      tip: 0,
      tax: 0,
      splitEvenAmount: 0,
      splitCustomAmounts: [],
    },

    even: true,
    custom: false,
  };

  onFormComplete = (e) => {
    const { onSubmit } = this.props;
    onSubmit(this.state);
  };

  setName = (e) => {
    var d = this.state.details;
    d.name = e.target.value;
    this.setState({ details: d });
  };

  setAmount = (e) => {
    var d = this.state.details;
    d.amount = e.target.value;
    this.setState({ details: d });
  };

  setPaidBy = (e) => {
    var d = this.state.details;
    var name = e.target.value;
    d.paidBy = name;
    this.setState({ paidBy: name, details: d });
  };

  setTip = (e) => {
    var d = this.state.details;
    d.tip = e.target.value;
    this.setState({ details: d });
  };

  setTax = (e) => {
    var d = this.state.details;
    d.tax = e.target.value;
    this.setState({ details: d });
  };

  calculateReceiptTotal = () => {
    const { amount, tip, tax } = this.state.details;

    var total = +amount + +tip + +tax;
    total = total.toFixed(2);

    return `$ ${total}`;
  };

  splitEven = () => {
    const { amount, tip, tax } = this.state.details;
    const total = +amount + +tip + +tax;
    const numberOfParticipants = this.props.participants.length;

    var d = this.state.details;
    var splitEven = total / numberOfParticipants;

    splitEven = splitEven.toFixed(2);
    d.splitEvenAmount = splitEven;

    this.setState({ details: d, even: true, custom: false });
  };

  splitCustom = () => {
    var d = this.state.details;
    d.evenSplit = 0;
    this.setState({ details: d, even: false, custom: true });
  };

  renderPaidByDropdown = () => {
    var participants = this.props.participants;
    var options = [];
    var len = participants.length;
    var i;

    for (i = 0; i < len; i++) {
      const name = participants[i];
      const id = name + i;

      options.push(
        <option value={i} key={id}>
          {name}
        </option>
      );
    }

    return (
      <select
        className="ui dropdown"
        value={this.state.paidBy}
        onChange={this.setPaidBy}>
        {options}
      </select>
    );
  };

  render() {
    return (
      <div>
        <form className="ui form" onSubmit={this.onFormComplete}>
          <div className="container-field">
            <div className="field">
              <label>Receipt Name</label>
              <input
                id="receiptName"
                type="text"
                placeholder="Receipt Name"
                onChange={this.setName}></input>
            </div>
          </div>
          <div className="container-fields">
            <div className="field field-left">
              <label>Amount</label>
              <input
                id="receiptAmount"
                type="number"
                placeholder="0.00"
                min="0.00"
                step="0.01"
                onChange={this.setAmount}></input>
            </div>
            <div className="field field-right">
              <label>Paid By</label>
              {this.renderPaidByDropdown()}
            </div>
          </div>
          <div className="container-fields">
            <div className="field field-left">
              <label>Tip</label>
              <input
                id="receiptTip"
                type="number"
                placeholder="0.00"
                min="0.00"
                step="0.01"
                onChange={this.setTip}></input>
            </div>
            <div className="field field-right">
              <label>Tax</label>
              <input
                id="receiptTip"
                type="number"
                placeholder="0.00"
                min="0.00"
                step="0.01"
                onChange={this.setTax}></input>
            </div>
          </div>
          <div className="container-fields">
            <div className="field field-left">
              <label>Receipt Total</label>
              <div className="ui tag label">
                <a className="ui label">{this.calculateReceiptTotal()}</a>
              </div>
            </div>
            <div className="field field-right">
              <label>Split</label>
              <div className="ui buttons container-buttons">
                <button
                  className="ui button button-even"
                  type="button"
                  onClick={this.splitEven}>
                  Even
                </button>
                <div className="or"></div>
                <button
                  className="ui button button-custom"
                  type="button"
                  onClick={this.splitCustom}>
                  Custom
                </button>
              </div>
            </div>
          </div>
        </form>
        <br />
      </div>
    );
  }
}

export default ReceiptInput;
