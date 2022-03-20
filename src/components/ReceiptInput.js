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
    itemize: true,

    // receipts: [],

    receipts: [
      {
        id: "Tickets185",
        name: "Tickets",
        amount: "185",
        paidBy: this.props.participants[0],
        tip: "",
        tax: "9.15",
        total: "194.15",
        splitEven: true,
        splitEvenAmount: 64.72,
        splitCustomAmounts: ["", "", ""],
      },
      {
        id: "Food120",
        name: "Food",
        amount: "120",
        paidBy: this.props.participants[0],
        tip: "",
        tax: "",
        total: "120",
        splitEven: true,
        splitEvenAmount: 40,
        splitCustomAmounts: ["", "", ""],
      },
      {
        id: "Car Rental100",
        name: "Car Rental",
        amount: "100",
        paidBy: this.props.participants[1],
        tip: "20",
        tax: "3",
        total: "123",
        splitEven: true,
        splitEvenAmount: 41,
        splitCustomAmounts: ["", "", ""],
      },
      {
        id: "Air Bnb250",
        name: "Air Bnb",
        amount: "250",
        paidBy: this.props.participants[2],
        tip: "20",
        tax: "8.5",
        total: "258.5",
        splitEven: false,
        splitEvenAmount: 86.17,
        splitCustomAmounts: ["100", "75", "83.5"],
      },
    ],
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
    var { details } = this.state;
    details.splitEven = false;

    this.setState({
      details: details,
      even: false,
      custom: true,
      itemize: false,
    });
  };

  splitEven = () => {
    var { details } = this.state;
    details.splitEven = true;

    this.setState({
      details: details,
      even: true,
      custom: false,
      itemize: false,
    });
  };

  splitItemize = () => {
    var { details } = this.state;
    details.splitEven = false;

    this.setState({
      details: details,
      even: false,
      custom: false,
      itemize: true,
    });
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
      <div className="container-button breakdown">
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
    const { details, even, custom, itemize } = this.state;

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
              <div className="three medium ui buttons">
                <button
                  className={`ui toggle button width ${
                    even ? "button-active" : ""
                  }`}
                  type="button"
                  onClick={this.splitEven}>
                  Even
                </button>
                <button
                  className={`ui toggle button width ${
                    custom ? "button-active" : ""
                  }`}
                  type="button"
                  onClick={this.splitCustom}>
                  Custom
                </button>
                <button
                  className={`ui toggle button width ${
                    itemize ? "button-active-alt" : ""
                  }`}
                  type="button"
                  onClick={this.splitItemize}>
                  Itemize
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
