import React, { Component } from "react";

class AmountOwed extends Component {
  state = { customAmt: [] };

  curr = [];

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
            onChange={(e) => this.setVals(e.target.value, x)}></input>
        </td>
      </tr>
    );
  };

  setVals = (x, k) => {
    var amountObj = {
      key: "",
      amt: 0,
    };

    var match = false;
    var len = this.curr.length;
    var i = 0;
    var xfloat = parseFloat(x);

    amountObj.key = k;
    amountObj.amt = xfloat;

    if (len === 0) {
      this.curr.push(amountObj);
    } else {
      while (i !== len) {
        if (this.curr[i].key === k) {
          match = true;
          this.curr[i].amt = xfloat;
          break;
        } else {
          i++;
        }
      }
      if (match === false) {
        this.curr.push(amountObj);
      }
    }

    this.setState({
      customAmt: this.state.customAmt.splice(0, len, ...this.curr),
    });
    console.log("state.customAmt: ", this.state.customAmt);
    this.props.onReceiptInputReturn(this.state.customAmt);
  };

  render() {
    if (this.props.dispEven === true) {
      console.log("split even was clicked");
      return (
        <div>
          <table>
            <tbody>{this.props.members.map(this.listEven)}</tbody>
          </table>
        </div>
      );
    } else if (this.props.dispCust === true) {
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
