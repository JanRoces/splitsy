import React, { Component } from "react";
import { TEST_AMOUNT } from "../util";
import AmountOwed from "./AmountOwed";
import "./ReceiptInput.css";

class ReceiptInput extends Component {
  state = {
    // TEST DETAILS
    // details: {
    //   id: 0,
    //   name: "",
    //   amount: TEST_AMOUNT.amount,
    //   paidBy: this.props.participants[0],
    //   tip: TEST_AMOUNT.tip,
    //   tax: TEST_AMOUNT.tax,
    //   total: TEST_AMOUNT.total,
    //   splitEvenAmount: TEST_AMOUNT.splitEven,
    //   splitCustomAmounts: this.props.customAmounts,
    // },

    details: {
      id: 0,
      name: "",
      amount: 0,
      paidBy: this.props.participants[0],
      tip: 0,
      tax: 0,
      total: 0,
      splitEvenAmount: 0,
      splitCustomAmounts: this.props.customAmounts,
    },

    even: false,
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
    const numberOfParticipants = this.props.participants.length;
    var d = this.state.details;
    d.amount = e.target.value;
    d.total = +d.amount + +d.tip + +d.tax;
    d.total = d.total.toFixed(2);
    d.splitEvenAmount = d.total / numberOfParticipants;
    d.splitEvenAmount = d.splitEvenAmount.toFixed(2);
    this.setState({ details: d });
  };

  setPaidBy = (e) => {
    var d = this.state.details;
    var name = e.target.value;
    d.paidBy = name;
    this.setState({ paidBy: name, details: d });
  };

  setTip = (e) => {
    const numberOfParticipants = this.props.participants.length;
    var d = this.state.details;
    d.tip = e.target.value;
    d.total = +d.amount + +d.tip + +d.tax;
    d.total = d.total.toFixed(2);
    d.splitEvenAmount = d.total / numberOfParticipants;
    d.splitEvenAmount = d.splitEvenAmount.toFixed(2);
    this.setState({ details: d });
  };

  setTax = (e) => {
    const numberOfParticipants = this.props.participants.length;
    var d = this.state.details;
    d.tax = e.target.value;
    d.total = +d.amount + +d.tip + +d.tax;
    d.total = d.total.toFixed(2);
    d.splitEvenAmount = d.total / numberOfParticipants;
    d.splitEvenAmount = d.splitEvenAmount.toFixed(2);
    this.setState({ details: d });
  };

  splitEven = () => {
    this.setState({ even: true, custom: false });
  };

  splitCustom = () => {
    this.setState({ even: false, custom: true });
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

  renderAmountOwed = () => {
    const { splitEvenAmount, splitCustomAmounts, total } = this.state.details;
    const { even, custom } = this.state;

    return even || custom ? (
      <AmountOwed
        participants={this.props.participants}
        splitEvenAmount={splitEvenAmount}
        splitCustomAmounts={splitCustomAmounts}
        evenSplit={even}
        customSplit={custom}
        total={total}
      />
    ) : (
      ""
    );
  };

  render() {
    return (
      <div>
        <form className="ui form" onSubmit={this.onFormComplete}>
          <div className="container-field">
            <div className="field">
              <label>Receipt Name</label>
              <div className="ui right labeled icon input">
                <input
                  type="text"
                  placeholder="Receipt Name"
                  onChange={this.setName}></input>
                <a className="ui tag label">$ {this.state.details.total}</a>
              </div>
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
          <div className="container-buttons">
            <div className="field">
              <label>Split</label>
              <div className="two ui buttons">
                <button
                  className="ui button button-even"
                  type="button"
                  onClick={this.splitEven}>
                  Even
                </button>
                <button
                  className="ui button button-custom"
                  type="button"
                  onClick={this.splitCustom}>
                  Custom
                </button>
              </div>
            </div>
          </div>
          {this.renderAmountOwed()}
        </form>
        <br />
      </div>
    );
  }
}

export default ReceiptInput;
