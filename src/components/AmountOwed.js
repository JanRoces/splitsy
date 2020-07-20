import React, { Component } from "react";
import "./AmountOwed.css";

class AmountOwed extends Component {
  state = { customAmt: [] };

  curr = [];

  render() {
    if (this.props.dispEven === true) {
      console.log("split even was clicked");
      return (
        <div className="field">
          <div>{this.props.members.map(this.listEven)}</div>
        </div>
      );
    } else if (this.props.dispCust === true) {
      console.log("split custom was clicked");
      return (
        <div className="field">
          <div>{this.props.members.map(this.listCustom)}</div>
        </div>
      );
    } else {
      console.log("nothing clicked");
      return <div></div>;
    }
  }

  listEven = (x) => {
    var listArr = [];
    var n = this.props.amt;
    var m = n / this.props.members.length;
    var num = m.toFixed(2);

    return (
      <div className="inline fields" key={x}>
        <label className="split-list">{x}</label>
        <div>
          <input value={num} type="number" readOnly></input>
        </div>
      </div>
    );
  };

  listCustom = (x) => {
    // return (
    //   <tr key={x}>
    //     <td style={{ width: "80px" }}>{x}</td>
    //     <td style={{ align: "right" }}>$</td>
    //     <td style={{ align: "right" }}>
    // <input
    //   key={x}
    //   className="amount-form"
    //   type="number"
    //   placeholder="0.00"
    //   step="0.01"
    //   onChange={(e) => this.setVals(e.target.value, x)}></input>;
    //     </td>
    //   </tr>
    // );

    return (
      <div className="inline fields">
        <label className="split-list" key={x}>
          {x}
        </label>
        <div>
          <input
            key={x}
            className="amount-form"
            type="number"
            placeholder="0.00"
            step="0.01"
            onChange={(e) => this.setVals(e.target.value, x)}></input>
        </div>
      </div>
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
    console.log("xfloat: ", xfloat);

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
}

export default AmountOwed;
