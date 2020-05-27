import React, { Component } from "react";
import AmountOwed from "./AmountOwed";
import "./Display.css";

const icon = "camera icon";
const dummyData = ["Jan", "Jeff", "Jorge"];

const makeOption = function (x) {
  return <option key={x}>{x}</option>;
};

class GatherReceipts extends Component {
  state = {
    //participants: this.props.members,
    participants: dummyData,
    name: "",
    amount: 0.0,
    even: false,
    custom: false,
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
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

  //value={this.state.evenSplit}
  listAmountOwed = (x) => {
    return (
      <tr key={x}>
        <td style={{ width: "80px" }}>{x}</td>
        <td style={{ align: "right" }}>$</td>
        <td style={{ align: "right" }}>
          <input
            className="amount-form"
            type="number"
            placeholder=" 0.00"
            min="0.00"
            step="0.01"
            value={this.state.evenSplit}
            onChange={(e) => this.splitCustom(e.target.value)}
          ></input>
        </td>
      </tr>
    );
  };

  render() {
    return (
      <div>
        <form className="add-receipt-form" onSubmit={this.handleOnSubmit}>
          <div>
            <i className={`${icon} icon`}></i>
            <input
              type="text"
              placeholder="Receipt Name"
              onChange={(e) => this.setState({ name: e.target.value })}
            ></input>
            $
            <input
              className="amount-form"
              type="number"
              placeholder="0.00"
              min="0.00"
              step="0.01"
              onChange={(e) => this.setState({ amount: e.target.value })}
            ></input>
            <label>Paid By:</label>
            {/*<select>{this.props.members.map(makeOption)}</select>*/}
            {<select>{dummyData.map(makeOption)}</select>}
            <button type="button" onClick={this.splitEven}>
              split even
            </button>
            <button type="button" onClick={this.splitCustom}>
              custom
            </button>
            {/*<div>
              <table>
                {/*{this.props.members.map(listAmountOwed}
                <tbody>{dummyData.map(this.listAmountOwed)}</tbody>
              </table>
                </div>*/}
            <div>
              <AmountOwed
                dispEven={this.state.even}
                dispCust={this.state.custom}
                members={this.state.participants}
                amt={this.state.amount}
              />
            </div>
          </div>
          <button>submit</button>
        </form>
        <div>
          <button type="button">+</button>
        </div>
      </div>
    );
  }
}

export default GatherReceipts;
