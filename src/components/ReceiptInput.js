import React, { Component } from "react";
import ReactDOM from "react-dom";
import AmountOwed from "./AmountOwed";
import "./ReceiptInput.css";

class ReceiptInput extends Component {
  state = {
    details: {
      id: 0,
      name: "",
      amount: 0,
      // paidBy: "",
      paidBy: this.props.participants[0],
      evenSplit: 0,
      custom: [],
    },

    receipts: [],
    display: [],
    runningAmount: 0,
    even: true,
    custom: false,
    edit: false,
    currID: 0,
  };

  setName = (name) => {
    var d = this.state.details;
    d.name = name;
    this.setState({ details: d });
  };

  setAmount = (amount) => {
    var d = this.state.details;
    d.amount = amount;
    this.setState({ details: d, runningAmount: amount });
  };

  setPaidBy = (event) => {
    console.log("event.target.value :>> ", event.target.value);
    var d = this.state.details;
    var p = this.props.participants;
    d.paidBy = "jan";
    this.setState({ details: d });
    console.log("details :>> ", this.state.details);
  };

  calculateReceiptTotal = () => {};
  renderPaidByDropdown = () => {
    var participants = this.props.participants;
    var options = [];
    var len = participants.length;
    var i;

    for (i = 0; i < len; i++) {
      const name = participants[i];
      const id = Math.floor(1000 + Math.random() * 9000);

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
        <form className="ui form">
          <div className="container-field">
            <div className="field">
              <label>Receipt Name</label>
              <input
                id="receiptName"
                type="text"
                placeholder="Receipt Name"
                onChange={(e) => this.setName(e.target.value)}></input>
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
                onChange={(e) => this.setAmount(e.target.value)}></input>
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
                step="0.01"></input>
            </div>
            <div className="field field-right">
              <label>Tax</label>
              <input
                id="receiptTip"
                type="number"
                placeholder="0.00"
                min="0.00"
                step="0.01"></input>
            </div>
          </div>
          <div className="container-fields">
            <div className="ui tag label">
              <a className="ui label">{this.calculateReceiptTotal()}</a>
            </div>
          </div>
          {/*
          <div className="inline fields">
            <label>Split</label>
            <div className="ui buttons">
              <button
                className="ui button"
                type="button"
                onClick={this.splitEven}>
                Even
              </button>
              <div className="or"></div>
              <button
                className="ui button"
                type="button"
                onClick={this.splitCustom}>
                Custom
              </button>
            </div>
          </div>
          <div></div>
          <div className="fields">
            <button
              className="ui button"
              type="button"
              onClick={this.pushReceipt}>
              Done with Receipt
            </button>
            <button className="ui button" type="reset" onClick={this.resetForm}>
              Clear
            </button>
          </div>
          <br />
          <div className="inline fields">
            <button className="ui primary button">Submit</button>
          </div>
            */}
        </form>
        <br />
        <div className="card-container">
          <div className="ui four cards">{this.showList()}</div>
        </div>
      </div>
    );
  }

  handleOnSubmit = (e) => {
    const { onSubmit } = this.props;
    onSubmit(this.state);
  };

  makeOption = function (x) {
    return <option key={x}>{x}</option>;
  };

  splitEven = () => {
    var d = this.state.details;
    var n = d.amount;
    var m = n / this.props.members.length;
    var num = m.toFixed(2);
    var fNum = parseFloat(num);

    d.evenSplit = fNum;
    d.custom = [];
    this.setState({ details: d, even: true, custom: false });
  };

  splitCustom = () => {
    var d = this.state.details;
    d.evenSplit = 0;
    this.setState({ details: d, even: false, custom: true });
  };

  getCustomVals = (vals) => {
    var d = this.state.details;
    d.custom = d.custom.splice(0, vals.length, ...vals);
    d.custom = vals;
    this.setState({ details: d });
  };

  resetForm = () => {
    this.setState({ even: true, custom: false });
  };

  pushReceipt = () => {
    var d = this.state.details;
    var a = this.state.receipts;
    var len = a.length;
    var i;

    var r = {
      id: 0,
      name: "",
      amount: 0,
      payer: "",
      evenSplit: 0,
      custom: [],
    };

    if (this.state.even === true) {
      var n = d.amount;
      var m = n / this.props.members.length;
      var num = m.toFixed(2);
      var fNum = parseFloat(num);
      d.evenSplit = fNum;
    }

    if (this.state.edit === false) {
      var n = Math.floor(1000 + Math.random() * 9000);
      Object.assign(r, d);
      r.custom = this.deepCopy(d.custom);
      r.id = n;
      a = [...a, r];
      this.props.onMainReturn(a);
      this.setState({ receipts: a, even: true, custom: false });
    } else {
      for (i = 0; i < len; i++) {
        if (a[i].id === d.id) {
          a[i] = d;
          this.setState({
            receipts: a,
            edit: false,
            even: true,
            custom: false,
          });
          break;
        }
      }
    }
  };

  showList = () => {
    var dispRec = [];
    var d = this.state.receipts;
    var len = this.state.receipts.length;
    var i;
    for (i = 0; i < len; i++) {
      var rID = d[i].id;
      dispRec.push(
        <div className="card" key={i}>
          <div className="content">
            <div className="header">{d[i].name}</div>
            <div className="description">
              Amount: ${d[i].amount}
              <br />
              Paid by: {d[i].payer}
            </div>
          </div>
          <div className="ui two bottom attached buttons">
            <div
              className="ui button"
              onClick={this.editReceipt.bind(this, rID)}>
              Edit
            </div>
            <div
              className="ui button"
              onClick={this.removeReceipt.bind(this, rID)}>
              Remove
            </div>
          </div>
        </div>
      );
    }
    return <React.Fragment>{dispRec}</React.Fragment>;
  };

  editReceipt = (i) => {
    var r = this.state.receipts;
    var len = r.length;
    var d = this.state.details;
    var j;
    d.id = i;

    for (j = 0; j < len; j++) {
      if (r[j].id === i) {
        document.getElementById("receiptName").value = r[j].name;
        document.getElementById("receiptAmount").value = r[j].amount;
        document.getElementById("receiptPayer").value = r[j].payer;
        d.name = r[j].name;
        d.amount = r[j].amount;
        d.payer = r[j].payer;
        if (r[j].evenSplit === 0) {
          this.setState({ custom: true });
        } else {
          this.setState({ even: true });
        }
        break;
      }
    }
    this.setState({ edit: true, details: d });
  };

  removeReceipt = (i) => {
    var r = this.state.receipts;
    var len = r.length;
    var j;

    for (j = 0; j < len; j++) {
      if (r[j].id === i) {
        r.splice(j, 1);
        break;
      }
    }

    this.setState({ receipts: r, edit: false });
  };

  deepCopy(inObj) {
    let outObj, value, key;

    if (typeof inObj !== "object" || inObj === null) {
      return inObj;
    }

    outObj = Array.isArray(inObj) ? [] : {};

    for (key in inObj) {
      value = inObj[key];
      outObj[key] = this.deepCopy(value);
    }
    return outObj;
  }
}

export default ReceiptInput;
