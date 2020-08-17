import React, { Component } from "react";
import ReactDOM from "react-dom";
import AmountOwed from "./AmountOwed";
import "./ReceiptInput.css";

class ReceiptInput extends Component {
  state = {
    details: {
      name: "",
      amount: 0,
      payer: "",
      evenSplit: 0,
      custom: [],
    },
    title: "",
    members: [],
    receipts: [],
    display: [],
    runningAmount: 0,
    even: false,
    custom: false,
  };

  // receiptDetails = {
  //   name: "",
  //   amount: 0,
  //   payer: "",
  //   evenSplit: 0,
  //   custom: [],
  // };

  componentDidMount = () => {
    this.setState({ title: this.props.title, members: this.props.members });
  };

  render() {
    return (
      <div>
        <div className="receipt-container">
          <form className="ui form" onSubmit={this.handleOnSubmit}>
            <div className="receipt">
              <div className="fields">
                <div className="four wide field">
                  <label>Receipt Name</label>
                  <input
                    type="text"
                    placeholder="Receipt Name"
                    onChange={(e) => this.setName(e.target.value)}></input>
                </div>
                <div className="two wide field">
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
                    <option>- select option -</option>
                    {this.props.members.map(this.makeOption)}
                  </select>
                </div>
              </div>
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
              <div>
                <AmountOwed
                  dispEven={this.state.even}
                  dispCust={this.state.custom}
                  members={this.props.members}
                  amt={this.state.runningAmount}
                  onReceiptInputReturn={this.getCustomVals}
                />
              </div>
              <div className="fields">
                <button
                  className="ui button"
                  type="button"
                  onClick={this.pushReceipt}>
                  Done with Receipt
                </button>
                <button
                  className="ui button"
                  type="reset"
                  onClick={this.resetForm}>
                  Clear
                </button>
              </div>
            </div>
            <br />
            <div className="inline fields">
              <button className="ui primary button">Submit</button>
            </div>
          </form>
        </div>
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

  setName = (name) => {
    // this.receiptDetails.name = name;
    // console.log("receiptDetails.name: ", this.receiptDetails.name);
    var d = this.state.details;
    d.name = name;
    this.setState({ details: d });
  };

  setAmount = (amount) => {
    // this.receiptDetails.amount = parseFloat(amount);
    // console.log("receiptDetails.amount: ", this.receiptDetails.amount);
    // this.setState({ runningAmount: amount });
    var d = this.state.details;
    d.amount = amount;
    this.setState({ details: d, runningAmount: amount });
  };

  setPayer = () => {
    var selected = ReactDOM.findDOMNode(this.refs.selector).value;
    // this.receiptDetails.payer = selected;
    // console.log("receiptDetails.payer: ", this.receiptDetails.payer);
    var d = this.state.details;
    d.payer = selected;
    this.setState({ details: d });
  };

  splitEven = () => {
    // this.receiptDetails.custom = [];
    // var n = this.receiptDetails.amount;
    var d = this.state.details;
    var n = d.amount;

    var m = n / this.props.members.length;
    var num = m.toFixed(2);
    var fNum = parseFloat(num);

    // this.receiptDetails.evenSplit = fNum;
    // console.log("receiptDetails.evenSplit: ", this.receiptDetails.evenSplit);
    // this.setState({ even: true, custom: false });
    d.evenSplit = fNum;
    d.custom = [];
    this.setState({ details: d, even: true, custom: false });
  };

  splitCustom = () => {
    // this.receiptDetails.evenSplit = 0;
    // this.setState({ even: false, custom: true });
    var d = this.state.details;
    d.evenSplit = 0;
    this.setState({ details: d, even: false, custom: true });
  };

  getCustomVals = (vals) => {
    // this.receiptDetails.custom = this.receiptDetails.custom.splice(
    //   0,
    //   vals.length,
    //   ...vals
    // );
    // this.receiptDetails.custom = vals;
    // console.log("onReturn customVals: ", this.receiptDetails.custom);
    var d = this.state.details;
    d.custom = d.custom.splice(0, vals.length, ...vals);
    d.custom = vals;
    console.log("d.custom:", d.custom);
    this.setState({ details: d });
  };

  resetForm = () => {
    this.setState({ even: false, custom: false });
  };

  pushReceipt = () => {
    console.log("this.props.members: ", this.props.members);
    var d = this.state.details;
    var a = this.state.receipts;
    var r = {
      name: "",
      amount: 0,
      payer: "",
      evenSplit: 0,
      custom: [],
    };

    Object.assign(r, d);
    r.custom = this.deepCopy(d.custom);
    a = [...a, r];
    console.log(a);
    this.props.onMainReturn(a);
    this.setState({ receipts: a });
    //this.props.onMainReturn(this.state.receipts);
    //this.setState({ receipts: [...this.state.receipts, r] });
    // this.setState({ receipts: [...this.state.receipts, this.receiptDetails] });
  };

  showList = () => {
    var dispRec = [];
    var d = this.state.receipts;
    var len = this.state.receipts.length;
    var i;
    for (i = 0; i < len; i++) {
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
          <div className="ui bottom attached button">Edit</div>
        </div>
      );
    }
    return <React.Fragment>{dispRec}</React.Fragment>;
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
