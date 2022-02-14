import React, { Component } from "react";
import { LABEL_COLORS } from "../util";
import "./AmountOwed.css";

class AmountOwed extends Component {
  state = {
    splitEvenAmount: this.props.splitEvenAmount,
    splitCustomAmounts: this.props.splitCustomAmounts,
  };

  renderEvenSplitList = () => {
    const participants = this.props.participants;
    const splitEvenAmount = this.state.splitEvenAmount;
    const len = participants.length;

    var splitList = [];
    var j = 0;
    var i;

    console.log("splitEvenAmount :>> ", splitEvenAmount);

    for (i = 0; i < len; i++) {
      j = j > 10 ? 0 : j;

      const name = participants[i];
      const id = name + i;

      splitList.push(
        <div className="ui left labeled input container-label-split" key={id}>
          <div className={`ui ${LABEL_COLORS[j]} label label-split`}>
            {name}
          </div>
          <input type="number" value={splitEvenAmount} readOnly></input>
        </div>
      );
      j++;
    }

    return splitList;
    // <div class="ui right labeled input">
    //   <input type="text" placeholder="Enter weight..">
    //   <div class="ui basic label">
    //     kg
    //   </div>
    // </div>
  };

  renderCustomInputs = () => {
    return "custom";
  };

  render() {
    if (this.props.evenSplit) {
      return (
        <div className="container-split-list">{this.renderEvenSplitList()}</div>
      );
    }

    if (this.props.customSplit) {
      return <div>{this.renderCustomInputs()}</div>;
    }
    // if (this.props.dispEven === true) {
    //   console.log("split even was clicked");
    //   return (
    //     <div className="field">
    //       <div>{this.props.members.map(this.listEven)}</div>
    //     </div>
    //   );
    // } else if (this.props.dispCust === true) {
    //   console.log("split custom was clicked");
    //   return (
    //     <div className="field">
    //       <div>{this.props.members.map(this.listCustom)}</div>
    //     </div>
    //   );
    // } else {
    //   console.log("nothing clicked");
    //   return <div></div>;
    // }
  }

  listEven = (x) => {
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
    return (
      <div className="inline fields" key={x}>
        <label className="split-list">{x}</label>
        <div>
          <input
            id="receiptCustom"
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
