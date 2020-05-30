import React, { Component } from "react";

var customAmounts = {
  key: "",
  amt: 0,
};

class AmountOwed extends Component {
  state = { evenAmt: 0, customAmt: [], value: 0 };

  listEven = (x) => {
    var n = this.props.amt;
    var m = n / this.props.members.length;
    var num = m.toFixed(2);
    return (
      <tr key={x}>
        <td style={{ width: "80px" }}>{x}</td>
        <td style={{ align: "right" }}>$</td>
        <td style={{ align: "right" }}>{num}</td>
      </tr>
    );
  };

  listCustom = (x) => {
    return (
      <tr key={x}>
        <td style={{ width: "80px" }}>{x}</td>
        <td style={{ align: "right" }}>$</td>
        <td style={{ align: "right" }}>
          <input
            key={x}
            className="amount-form"
            type="number"
            placeholder="0.00"
            step="0.01"
            onChange={(e) => this.getVals(e.target.value, x)}></input>
        </td>
      </tr>
    );
  };

  getVals = (x, k) => {
    customAmounts.key = k;
    customAmounts.amt = x;
    console.log("kcustomAmounts.key: ", k);
    console.log("customAmounts.amt: ", x);
  };

  setVals = () => {
    var tmp = this.state.customAmt.concat(this.state.value);
    console.log("state.value: ", this.state.value);
    this.setState({ customAmt: tmp });
    console.log(this.state);
  };

  render() {
    if (this.props.dispEven == true) {
      console.log("split even was clicked");
      return (
        <div>
          <table>
            <tbody>{this.props.members.map(this.listEven)}</tbody>
          </table>
        </div>
      );
    } else if (this.props.dispCust == true) {
      console.log("custom was clicked");
      return (
        <div>
          <table>
            <tbody>{this.props.members.map(this.listCustom)}</tbody>
          </table>
        </div>
      );
    } else {
      console.log("nothing clicked");
      return <div></div>;
    }
  }
}
export default AmountOwed;
