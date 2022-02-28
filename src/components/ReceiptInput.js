import React, { Component } from "react";
import AmountOwed from "./AmountOwed";
import ReceiptList from "./ReceiptList";
import "./ReceiptInput.css";

class ReceiptInput extends Component {
  state = {
    details: {
      id: "",
      name: "",
      amount: "",
      paidBy: this.props.participants[0],
      tip: "",
      tax: "",
      total: "",
      splitEven: false,
      splitEvenAmount: 0,
      splitCustomAmounts: ["", ""],
    },

    editMode: false,
    even: false,
    custom: false,

    receipts: [],
  };

  deleteReceipt = (id) => {
    const { details, receipts } = this.state;
    const index = receipts.findIndex((receipt) => receipt.id === id);

    if (id === details.id) {
      this.setState({ editMode: false });
    }

    receipts.splice(index, 1);
    this.setState({ receipts: receipts });
  };

  editReceipt = (id) => {
    const { receipts } = this.state;
    const d = receipts.find((receipt) => receipt.id === id);

    this.setState({ editMode: true, details: d });
  };

  onFormComplete = () => {
    const { onSubmit } = this.props;
    onSubmit(this.state);
  };

  pushReceipt = () => {
    const { receipts, details, editMode } = this.state;
    const customAmounts = details.splitCustomAmounts.slice();

    if (editMode) {
      const index = receipts.findIndex((receipt) => receipt.id === details.id);
      receipts[index] = details;
    } else {
      details.id = details.name + details.amount;
      details.splitCustomAmounts = customAmounts;
      receipts.push(details);
    }

    this.receiptForm.reset();
    this.resetDetails();
  };

  resetDetails = () => {
    const { customAmounts } = this.props;
    customAmounts.fill("");

    const blankDetails = {
      id: "",
      name: "",
      amount: "",
      paidBy: this.props.participants[0],
      tip: "",
      tax: "",
      total: "",
      splitEven: false,
      splitEvenAmount: 0,
      splitCustomAmounts: customAmounts,
    };

    this.setState({
      details: blankDetails,
      editMode: false,
      even: false,
      custom: false,
    });
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

  setName = (e) => {
    var d = this.state.details;
    d.name = e.target.value;
    this.setState({ details: d });
  };

  setPaidBy = (e) => {
    var d = this.state.details;
    var name = e.target.value;
    d.paidBy = name;
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

  splitCustom = () => {
    var d = this.state.details;
    d.splitEven = false;
    this.setState({ details: d, even: false, custom: true });
  };

  splitEven = () => {
    var d = this.state.details;
    d.splitEven = true;
    this.setState({ details: d, even: true, custom: false });
  };

  renderAmountOwed = () => {
    const { name, splitEvenAmount, splitCustomAmounts, total } =
      this.state.details;
    const { editMode, even, custom } = this.state;
    const title = name;

    return even || custom ? (
      <AmountOwed
        editMode={editMode}
        evenSplit={even}
        customSplit={custom}
        participants={this.props.participants}
        splitEvenAmount={splitEvenAmount}
        splitCustomAmounts={splitCustomAmounts}
        total={total}
        title={title}
        onAddReceipt={this.pushReceipt}
      />
    ) : (
      ""
    );
  };

  renderBreakdownButton = () => {
    const { receipts } = this.state;

    return receipts.length ? (
      <div className="container-button">
        <button className="ui button">
          <i className="dollar icon"></i>
          Breakdown
        </button>
      </div>
    ) : (
      ""
    );
  };
  renderPaidByDropdown = () => {
    const { details } = this.state;

    var participants = this.props.participants;
    var options = [];
    var len = participants.length;
    var i;

    for (i = 0; i < len; i++) {
      const name = participants[i];
      const id = name + i;

      options.push(
        <option value={name} key={id}>
          {name}
        </option>
      );
    }

    return (
      <select
        className="ui dropdown"
        value={details.paidBy}
        onChange={this.setPaidBy}>
        {options}
      </select>
    );
  };

  renderReceiptList = () => {
    const hasReceipts = this.state.receipts.length;
    return hasReceipts ? (
      <ReceiptList
        receipts={this.state.receipts}
        onDeleteReceipt={this.deleteReceipt}
        onEditReceipt={this.editReceipt}
      />
    ) : (
      ""
    );
  };

  render() {
    const { details } = this.state;

    return (
      <div>
        <form
          className="ui form"
          ref={(ref) => (this.receiptForm = ref)}
          onSubmit={this.onFormComplete}>
          <div className="container-field">
            <div className="field">
              <label>Receipt Name</label>
              <div className="ui right labeled icon input">
                <input
                  type="text"
                  placeholder="Receipt Name"
                  value={details.name}
                  onChange={this.setName}></input>
                <a className="ui tag label">$ {details.total}</a>
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
                value={details.amount}
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
                value={details.tip}
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
                value={details.tax}
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
          {this.renderReceiptList()}
          {this.renderBreakdownButton()}
        </form>
      </div>
    );
  }
}

export default ReceiptInput;
